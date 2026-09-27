process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/algo_simulator_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth API', () => {
  const user = { name: 'مستخدم اختبار', email: 'test_auth@example.com', password: '123456' };

  it('registers a new user and returns a token', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.user.password).toBeUndefined();
  });

  it('rejects a duplicate email registration', async () => {
    const res = await request(app).post('/api/auth/register').send(user);
    expect(res.status).toBe(409);
  });

  it('rejects registration with a short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...user, email: 'short@example.com', password: '123' });
    expect(res.status).toBe(400);
  });

  it('logs in with correct credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: user.email, password: user.password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it('rejects login with a wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: user.email, password: 'wrong-password' });
    expect(res.status).toBe(401);
  });

  it('returns the current user profile with a valid token', async () => {
    const loginRes = await request(app).post('/api/auth/login').send({ email: user.email, password: user.password });
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${loginRes.body.token}`);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
  });

  it('rejects profile access without a token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });

  describe('progress tracking', () => {
    let token;

    beforeAll(async () => {
      const loginRes = await request(app).post('/api/auth/login').send({ email: user.email, password: user.password });
      token = loginRes.body.token;
    });

    it('records a completed algorithm for the user', async () => {
      const res = await request(app)
        .post('/api/auth/progress')
        .set('Authorization', `Bearer ${token}`)
        .send({ algorithmKey: 'bubbleSort' });
      expect(res.status).toBe(200);
      expect(res.body.completedAlgorithms).toContain('bubbleSort');
    });

    it('does not duplicate an already-completed algorithm', async () => {
      await request(app).post('/api/auth/progress').set('Authorization', `Bearer ${token}`).send({ algorithmKey: 'bubbleSort' });
      const res = await request(app)
        .post('/api/auth/progress')
        .set('Authorization', `Bearer ${token}`)
        .send({ algorithmKey: 'bubbleSort' });
      const count = res.body.completedAlgorithms.filter((k) => k === 'bubbleSort').length;
      expect(count).toBe(1);
    });

    it('rejects a progress update without an algorithmKey', async () => {
      const res = await request(app).post('/api/auth/progress').set('Authorization', `Bearer ${token}`).send({});
      expect(res.status).toBe(400);
    });

    it('rejects a progress update without a token', async () => {
      const res = await request(app).post('/api/auth/progress').send({ algorithmKey: 'bubbleSort' });
      expect(res.status).toBe(401);
    });
  });
});
