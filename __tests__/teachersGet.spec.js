const request = require('supertest');
const express = require('express');
const teacherRoutes = require('../routes/teacherRoutes');
const teacherController = require('../controllers/teacherController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

jest.mock('../controllers/teacherController');
jest.mock('../middlewares/authMiddleware');

const app = express();
app.use('/teachers', teacherRoutes);

describe('GET /teachers', () => {
  beforeEach(() => {
    // Limpa os mocks antes de cada teste
    isAuthenticated.mockClear();
    teacherController.getAllTeacher.mockClear();
  });

  it('should call isAuthenticated middleware and teacherController.getAllTeacher', async () => {
    // Mocking the isAuthenticated middleware to always call next()
    isAuthenticated.mockImplementation((req, res, next) => next());
    
    // Mocking the teacherController.getAllTeacher to send a response with 'All Teachers'
    teacherController.getAllTeacher.mockImplementation((req, res) => res.status(200).send('All Teachers'));

    // Making a GET request to the /teachers route
    const response = await request(app).get('/teachers');

    // Checking if the isAuthenticated middleware was called
    expect(isAuthenticated).toHaveBeenCalled();
    
    // Checking if the teacherController.getAllTeacher was called
    expect(teacherController.getAllTeacher).toHaveBeenCalled();
    
    // Checking if the response status is 200
    expect(response.status).toBe(200);
    
    // Checking if the response text is 'All Teachers'
    expect(response.text).toBe('All Teachers');
  });
});
