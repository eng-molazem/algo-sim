process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/algo_simulator_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let instructorToken;
let studentToken;
let sectionId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const instructorRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'مدرّس الاختبارات', email: 'quiz_instructor@example.com', password: '123456', role: 'instructor' });
  instructorToken = instructorRes.body.token;
  const studentRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'طالب الاختبارات', email: 'quiz_student@example.com', password: '123456' });
  studentToken = studentRes.body.token;

  const sectionRes = await request(app)
    .post('/api/sections')
    .set('Authorization', `Bearer ${instructorToken}`)
    .send({ name: 'شعبة الاختبارات' });
  sectionId = sectionRes.body.section._id;
  await request(app)
    .post('/api/sections/join')
    .set('Authorization', `Bearer ${studentToken}`)
    .send({ joinCode: sectionRes.body.section.joinCode });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

const RAW_QUESTIONS = [
  'ما تعقيد Bubble Sort في أسوأ حالة؟|O(n);O(n log n);O(n^2)|2',
  'هل Bubble Sort مستقر (stable)؟|نعم;لا|0',
].join('\n');

describe('Quizzes API', () => {
  let quizId;

  it('rejects a student trying to create a quiz', async () => {
    const res = await request(app)
      .post('/api/quizzes')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ title: 'اختبار الفقاعي', category: 'sorting', algorithm: 'bubbleSort', rawQuestions: RAW_QUESTIONS, section: sectionId });
    expect(res.status).toBe(403);
  });

  it('rejects creating a quiz without a section', async () => {
    const res = await request(app)
      .post('/api/quizzes')
      .set('Authorization', `Bearer ${instructorToken}`)
      .send({ title: 'اختبار الفقاعي', category: 'sorting', algorithm: 'bubbleSort', rawQuestions: RAW_QUESTIONS });
    expect(res.status).toBe(400);
  });

  it('rejects malformed question text', async () => {
    const res = await request(app)
      .post('/api/quizzes')
      .set('Authorization', `Bearer ${instructorToken}`)
      .send({ title: 'اختبار سيء', category: 'sorting', algorithm: 'bubbleSort', rawQuestions: 'not a valid line', section: sectionId });
    expect(res.status).toBe(400);
  });

  it('lets an instructor create a quiz from raw question text for their own section', async () => {
    const res = await request(app)
      .post('/api/quizzes')
      .set('Authorization', `Bearer ${instructorToken}`)
      .send({ title: 'اختبار الفقاعي', category: 'sorting', algorithm: 'bubbleSort', rawQuestions: RAW_QUESTIONS, section: sectionId });
    expect(res.status).toBe(201);
    expect(res.body.quiz.questions).toHaveLength(2);
    quizId = res.body.quiz._id;
  });

  it('hides the correct answer index when a student fetches the quiz', async () => {
    const res = await request(app)
      .get('/api/quizzes/algorithm/bubbleSort')
      .set('Authorization', `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(res.body.quizzes[0].questions[0].correctIndex).toBeUndefined();
    expect(res.body.quizzes[0].questions[0].options).toHaveLength(3);
  });

  it('grades a student submission correctly', async () => {
    const res = await request(app)
      .post(`/api/quizzes/${quizId}/attempts`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ answers: [2, 1] }); // first correct (2), second wrong (should be 0)
    expect(res.status).toBe(200);
    expect(res.body.score).toBe(1);
    expect(res.body.total).toBe(2);
  });

  it('rejects a submission with the wrong number of answers', async () => {
    const res = await request(app)
      .post(`/api/quizzes/${quizId}/attempts`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ answers: [0] });
    expect(res.status).toBe(400);
  });

  it('shows the instructor attempt stats and the student name for their quiz', async () => {
    const res = await request(app).get('/api/quizzes/mine').set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
    expect(res.body.quizzes[0].attemptCount).toBe(1);
    expect(res.body.quizzes[0].avgScorePercent).toBe(50);
    expect(res.body.quizzes[0].students).toEqual([{ name: 'طالب الاختبارات', score: 1, total: 2 }]);
  });

  it('shows the creating instructor name to students browsing quizzes', async () => {
    const res = await request(app).get('/api/quizzes').set('Authorization', `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(res.body.quizzes[0].instructorName).toBe('مدرّس الاختبارات');
  });

  it('hides the quiz from a student who has not joined the section', async () => {
    const outsiderRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'طالب خارج شعبة الاختبار', email: 'quiz_outsider@example.com', password: '123456' });
    const res = await request(app).get('/api/quizzes').set('Authorization', `Bearer ${outsiderRes.body.token}`);
    expect(res.body.quizzes).toHaveLength(0);
  });

  it('lets the instructor delete their quiz', async () => {
    const res = await request(app).delete(`/api/quizzes/${quizId}`).set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
  });
});
