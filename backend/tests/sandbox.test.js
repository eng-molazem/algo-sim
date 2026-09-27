process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/algo_simulator_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let tokenA;
let tokenB;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const resA = await request(app)
    .post('/api/auth/register')
    .send({ name: 'متسابق أول', email: 'sandbox_a@example.com', password: '123456' });
  tokenA = resA.body.token;
  const resB = await request(app)
    .post('/api/auth/register')
    .send({ name: 'متسابق ثانٍ', email: 'sandbox_b@example.com', password: '123456' });
  tokenB = resB.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Sandbox API', () => {
  it('rejects an attempt submission without a token', async () => {
    const res = await request(app).post('/api/sandbox/attempts').send({ algorithm: 'bubbleSort', timeMs: 5, isCorrect: true });
    expect(res.status).toBe(401);
  });

  it('rejects an incomplete attempt submission', async () => {
    const res = await request(app)
      .post('/api/sandbox/attempts')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ algorithm: 'bubbleSort' });
    expect(res.status).toBe(400);
  });

  it('records a correct attempt', async () => {
    const res = await request(app)
      .post('/api/sandbox/attempts')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ algorithm: 'bubbleSort', timeMs: 12.5, isCorrect: true });
    expect(res.status).toBe(201);
    expect(res.body.attempt.timeMs).toBe(12.5);
  });

  it('ranks the fastest correct attempt per user on the leaderboard', async () => {
    // user A: two attempts, best is 12.5ms (already submitted above) and a slower 40ms one
    await request(app)
      .post('/api/sandbox/attempts')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ algorithm: 'bubbleSort', timeMs: 40, isCorrect: true });
    // user B: a faster correct attempt
    await request(app)
      .post('/api/sandbox/attempts')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ algorithm: 'bubbleSort', timeMs: 3, isCorrect: true });
    // an incorrect attempt from user B should never appear on the leaderboard
    await request(app)
      .post('/api/sandbox/attempts')
      .set('Authorization', `Bearer ${tokenB}`)
      .send({ algorithm: 'bubbleSort', timeMs: 1, isCorrect: false });

    const res = await request(app).get('/api/sandbox/leaderboard/bubbleSort').set('Authorization', `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(res.body.leaderboard[0].name).toBe('متسابق ثانٍ');
    expect(res.body.leaderboard[0].bestTimeMs).toBe(3);
    expect(res.body.leaderboard[1].bestTimeMs).toBe(12.5);
    expect(res.body.leaderboard).toHaveLength(2); // one row per user, not per attempt
  });

  it('returns an empty leaderboard for an algorithm with no attempts', async () => {
    const res = await request(app).get('/api/sandbox/leaderboard/quickSort').set('Authorization', `Bearer ${tokenA}`);
    expect(res.status).toBe(200);
    expect(res.body.leaderboard).toEqual([]);
  });
});
