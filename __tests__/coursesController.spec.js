// courseRoutes.test.js
const request = require('supertest');
const express = require('express');
const courseRoutes = require('../routes/courseRoutes'); // Atualize o caminho conforme necessário
const courseController = require('../controllers/courseController'); // Atualize o caminho conforme necessário

const app = express();
app.use(express.json()); // Necessário para permitir JSON parsing no corpo das requisições
app.use('/courses', courseRoutes);

// Mock do middleware de autenticação
jest.mock('../middlewares/authMiddleware', () => ({
  isAuthenticated: (req, res, next) => next()
}));

// Mock das funções do controller
jest.mock('../controllers/courseController', () => ({
  getAllCourse: jest.fn((req, res) => res.status(200).json([])),
  createCourse: jest.fn((req, res) => res.status(201).json({ id: 1, name: 'Course' })),
  getSingleCourse: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: 'Course' })),
  updateCourse: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: 'Updated Course' })),
  deleteCourse: jest.fn((req, res) => res.status(204).send())
}));

describe('Course Routes', () => {
  test('GET /courses should return all courses', async () => {
    const response = await request(app).get('/courses');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /courses should create a new course', async () => {
    const newCourse = {
      name: 'New Course',
      description: 'A comprehensive course on new topics.',
      prerequisites: ['Basic Knowledge'],
      syllabus: 'Course syllabus details here.',
      duration: 12,
      delivery_mode: 'online',
      tuition_fee: 150.00
    };
    const response = await request(app)
      .post('/courses')
      .send(newCourse);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, name: 'Course' });
  });
  
  test('GET /courses/:id should return a single course', async () => {
    const response = await request(app).get('/courses/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Course' });
  });

  test('PUT /courses/:id should update a course', async () => {
    const updatedCourse = {
      name: 'Updated Course',
      description: 'Updated course description with more details.',
      prerequisites: ['Advanced Knowledge'],
      syllabus: 'Updated syllabus details here.',
      duration: 24,
      delivery_mode: 'hybrid',
      tuition_fee: 200.00
    };
    const response = await request(app)
      .put('/courses/1')
      .send(updatedCourse);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Updated Course' });
  });

  test('DELETE /courses/:id should delete a course', async () => {
    const response = await request(app).delete('/courses/1');
    expect(response.status).toBe(204);
  });

});
