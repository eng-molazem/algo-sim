process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/algo_simulator_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let instructorToken;
let studentAToken;
let studentBToken;
let outsiderToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const instructorRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'مدرّس الإحصائيات', email: 'stats_instructor@example.com', password: '123456', role: 'instructor' });
  instructorToken = instructorRes.body.token;

  const studentARes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'طالب إحصائيات أول', email: 'stats_student_a@example.com', password: '123456' });
  studentAToken = studentARes.body.token;
  const studentBRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'طالب إحصائيات ثانٍ', email: 'stats_student_b@example.com', password: '123456' });
  studentBToken = studentBRes.body.token;
  const outsiderRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'طالب خارج الشعبة', email: 'stats_outsider@example.com', password: '123456' });
  outsiderToken = outsiderRes.body.token;

  const sectionRes = await request(app)
    .post('/api/sections')
    .set('Authorization', `Bearer ${instructorToken}`)
    .send({ name: 'شعبة الإحصائيات' });
  const joinCode = sectionRes.body.section.joinCode;
  await request(app).post('/api/sections/join').set('Authorization', `Bearer ${studentAToken}`).send({ joinCode });
  await request(app).post('/api/sections/join').set('Authorization', `Bearer ${studentBToken}`).send({ joinCode });
  // the outsider deliberately never joins the instructor's section

  await request(app).post('/api/auth/progress').set('Authorization', `Bearer ${studentAToken}`).send({ algorithmKey: 'bubbleSort' });
  await request(app).post('/api/auth/progress').set('Authorization', `Bearer ${studentAToken}`).send({ algorithmKey: 'mergeSort' });
  await request(app).post('/api/auth/progress').set('Authorization', `Bearer ${studentBToken}`).send({ algorithmKey: 'bubbleSort' });
  await request(app).post('/api/auth/progress').set('Authorization', `Bearer ${outsiderToken}`).send({ algorithmKey: 'quickSort' });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Stats API', () => {
  it('rejects a student from viewing the overview', async () => {
    const res = await request(app).get('/api/stats/overview').set('Authorization', `Bearer ${studentAToken}`);
    expect(res.status).toBe(403);
  });

  it('gives the instructor an aggregate overview scoped to their own enrolled students only', async () => {
    const res = await request(app).get('/api/stats/overview').set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
    expect(res.body.totalStudents).toBe(2);
    const bubbleSortStat = res.body.topAlgorithms.find((a) => a.algorithm === 'bubbleSort');
    expect(bubbleSortStat.completedByCount).toBe(2);
    // the outsider's quickSort completion must not leak into this instructor's stats
    expect(res.body.topAlgorithms.find((a) => a.algorithm === 'quickSort')).toBeUndefined();
  });
});
