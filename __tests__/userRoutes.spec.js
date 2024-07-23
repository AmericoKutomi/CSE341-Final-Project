const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const db = require('../models/userModel');
const app = express();
const { ObjectId } = require('mongodb');

app.use(express.json());
app.use('/api', userRoutes);

jest.mock('../models/userModel');

// Example user data with a valid ObjectId
const validObjectId = new ObjectId().toHexString();
const mockUser = { _id: validObjectId, username: 'John Doe', email: 'john@example.com', password: 'hashedpassword', role: 'user' };

// Mock implementations for database methods
db.getAll.mockResolvedValue([mockUser]);
db.getSingle.mockResolvedValue(mockUser);
db.createUser.mockResolvedValue(mockUser);
db.updateUser.mockResolvedValue(mockUser);
db.deleteUser.mockResolvedValue(true);

describe('User Routes', () => {
  it('should get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockUser]);
  });

  it('should get a single user by ID', async () => {
    const res = await request(app).get(`/api/users/${validObjectId}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'John Doe', email: 'john@example.com', password: 'password', role: 'user' });
    expect(res.status).toBe(201);
  });

  it('should update a user by ID', async () => {
    const res = await request(app)
      .put(`/api/users/${validObjectId}`)
      .send({ username: 'John Doe', email: 'john@example.com', password: 'password', role: 'user' });
    expect(res.status).toBe(200);
  });

  it('should delete a user by ID', async () => {
    const res = await request(app).delete(`/api/users/${validObjectId}`);
    expect(res.status).toBe(200);
  });
});
