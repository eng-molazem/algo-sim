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
    .send({ name: 'مدرّس الواجبات', email: 'hw_instructor@example.com', password: '123456', role: 'instructor' });
  instructorToken = instructorRes.body.token;
  const studentRes = await request(app)
    .post('/api/auth/register')
    .send({ name: 'طالب الواجبات', email: 'hw_student@example.com', password: '123456' });
  studentToken = studentRes.body.token;

  const sectionRes = await request(app)
    .post('/api/sections')
    .set('Authorization', `Bearer ${instructorToken}`)
    .send({ name: 'شعبة الواجبات' });
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

describe('Assignments API', () => {
  let assignmentId;

  it('rejects a student trying to create an assignment', async () => {
    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ title: 'تمرين الترتيب', category: 'sorting', algorithm: 'bubbleSort', section: sectionId });
    expect(res.status).toBe(403);
  });

  it('rejects creating an assignment without a section', async () => {
    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${instructorToken}`)
      .send({ title: 'تمرين الترتيب', category: 'sorting', algorithm: 'bubbleSort' });
    expect(res.status).toBe(400);
  });

  it('lets an instructor create an assignment for their own section', async () => {
    const res = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${instructorToken}`)
      .send({ title: 'تمرين الترتيب', category: 'sorting', algorithm: 'bubbleSort', section: sectionId });
    expect(res.status).toBe(201);
    assignmentId = res.body.assignment._id;
  });

  it('shows the instructor their assignment with a zero submission count', async () => {
    const res = await request(app).get('/api/assignments').set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
    expect(res.body.assignments[0].submissionCount).toBe(0);
  });

  it('shows the enrolled student the assignment as not completed, with the creating instructor name', async () => {
    const res = await request(app).get('/api/assignments').set('Authorization', `Bearer ${studentToken}`);
    expect(res.status).toBe(200);
    expect(res.body.assignments[0].completed).toBe(false);
    expect(res.body.assignments[0].instructorName).toBe('مدرّس الواجبات');
  });

  it('hides the assignment from a student who has not joined the section', async () => {
    const outsiderRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'طالب خارج الشعبة', email: 'hw_outsider@example.com', password: '123456' });
    const res = await request(app).get('/api/assignments').set('Authorization', `Bearer ${outsiderRes.body.token}`);
    expect(res.body.assignments).toHaveLength(0);
  });

  it('marks the assignment completed once the student finishes that algorithm, and lists the student name for the instructor', async () => {
    await request(app)
      .post('/api/auth/progress')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ algorithmKey: 'bubbleSort' });

    const res = await request(app).get('/api/assignments').set('Authorization', `Bearer ${studentToken}`);
    expect(res.body.assignments[0].completed).toBe(true);

    const instructorRes = await request(app).get('/api/assignments').set('Authorization', `Bearer ${instructorToken}`);
    expect(instructorRes.body.assignments[0].submissionCount).toBe(1);
    expect(instructorRes.body.assignments[0].students).toEqual(['طالب الواجبات']);
  });

  it('does not duplicate a submission if the student completes it again', async () => {
    await request(app)
      .post('/api/auth/progress')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ algorithmKey: 'bubbleSort' });

    const res = await request(app).get('/api/assignments').set('Authorization', `Bearer ${instructorToken}`);
    expect(res.body.assignments[0].submissionCount).toBe(1);
  });

  it('lets the instructor delete their own assignment', async () => {
    const res = await request(app).delete(`/api/assignments/${assignmentId}`).set('Authorization', `Bearer ${instructorToken}`);
    expect(res.status).toBe(200);
  });

  it('rejects deleting an assignment that does not belong to the instructor', async () => {
    const createRes = await request(app)
      .post('/api/assignments')
      .set('Authorization', `Bearer ${instructorToken}`)
      .send({ title: 'تمرين آخر', category: 'searching', algorithm: 'binarySearch', section: sectionId });
    const otherInstructorRes = await request(app)
      .post('/api/auth/register')
      .send({ name: 'مدرّس آخر', email: 'hw_instructor2@example.com', password: '123456', role: 'instructor' });

    const res = await request(app)
      .delete(`/api/assignments/${createRes.body.assignment._id}`)
      .set('Authorization', `Bearer ${otherInstructorRes.body.token}`);
    expect(res.status).toBe(404);
  });
});
