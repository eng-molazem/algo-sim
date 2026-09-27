process.env.MONGO_URI = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/algo_simulator_test';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const res = await request(app)
    .post('/api/auth/register')
    .send({ name: 'مستخدم المحاكاة', email: 'test_sim@example.com', password: '123456' });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Simulations API', () => {
  let simulationId;

  it('rejects unauthenticated access', async () => {
    const res = await request(app).get('/api/simulations');
    expect(res.status).toBe(401);
  });

  it('creates a new simulation', async () => {
    const res = await request(app)
      .post('/api/simulations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        category: 'sorting',
        algorithm: 'bubbleSort',
        title: 'Test Simulation',
        inputData: [5, 3, 8, 2],
        settings: {},
      });
    expect(res.status).toBe(201);
    expect(res.body.simulation._id).toBeDefined();
    simulationId = res.body.simulation._id;
  });

  it('rejects creating a simulation with missing fields', async () => {
    const res = await request(app)
      .post('/api/simulations')
      .set('Authorization', `Bearer ${token}`)
      .send({ category: 'sorting' });
    expect(res.status).toBe(400);
  });

  it('lists simulations for the authenticated user', async () => {
    const res = await request(app).get('/api/simulations').set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.simulations.length).toBeGreaterThanOrEqual(1);
  });

  it('retrieves a single simulation by id', async () => {
    const res = await request(app).get(`/api/simulations/${simulationId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.simulation.algorithm).toBe('bubbleSort');
  });

  it('deletes a simulation', async () => {
    const res = await request(app).delete(`/api/simulations/${simulationId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it('returns 404 for a deleted simulation', async () => {
    const res = await request(app).get(`/api/simulations/${simulationId}`).set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });
});
