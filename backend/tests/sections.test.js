process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/algo_simulator_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let instructorToken;
let otherInstructorToken;
let studentToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const instructorRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'مدرّس الشعب', email: 'section_instructor@example.com', password: '123456', role: 'instructor' });
  instructorToken = instructorRes.body.token;
  const otherRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'مدرّس آخر للشعب', email: 'section_instructor2@example.com', password: '123456', role: 'instructor' });
  otherInstructorToken = otherRes.body.token;
  const studentRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'طالب الشعب', email: 'section_student@example.com', password: '123456' });
  studentToken = studentRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Sections API', () => {
  let sectionId;
  let joinCode;

  it('rejects a student trying to create a section', async () => {
    const res = await request(app).post('/api/sections').set('Authorization', `Bearer ${studentToken}`).send({ name: 'شعبة أ' });
    expect(res.status).toBe(403);
  });

  it('lets an instructor create a section with a generated join code', async () => {
    const res = await request(app).post('/api/sections').set('Authorization', `Bearer ${instructorToken}`).send({ name: 'شعبة أ' });
    expect(res.status).toBe(201);
    expect(res.body.section.joinCode).toBeDefined();
    sectionId = res.body.section._id;
    joinCode = res.body.section.joinCode;
  });

  it('shows the instructor their section with zero students', async () => {
    const res = await request(app).get('/api/sections/mine').set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
    expect(res.body.sections[0].studentCount).toBe(0);
  });

  it('rejects an invalid join code', async () => {
    const res = await request(app).post('/api/sections/join').set('Authorization', `Bearer ${studentToken}`).send({ joinCode: 'WRONG1' });
    expect(res.status).toBe(404);
  });

  it('lets a student join a section by code and see the instructor name', async () => {
    const res = await request(app)
      .post('/api/sections/join')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ joinCode });
    expect(res.status).toBe(200);

    const joined = await request(app).get('/api/sections/joined').set('Authorization', `Bearer ${studentToken}`);
    expect(joined.body.sections[0].instructorName).toBe('مدرّس الشعب');
  });

  it('does not duplicate enrollment on rejoining with the same code', async () => {
    await request(app).post('/api/sections/join').set('Authorization', `Bearer ${studentToken}`).send({ joinCode });
    const res = await request(app).get('/api/sections/mine').set('Authorization', `Bearer ${instructorToken}`);
    expect(res.body.sections[0].studentCount).toBe(1);
  });

  it('rejects deleting a section that belongs to another instructor', async () => {
    const res = await request(app).delete(`/api/sections/${sectionId}`).set('Authorization', `Bearer ${otherInstructorToken}`);
    expect(res.status).toBe(404);
  });

  it('lets the owning instructor delete their section', async () => {
    const res = await request(app).delete(`/api/sections/${sectionId}`).set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
  });
});
