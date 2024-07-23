const request = require('supertest');
const express = require('express');
const teacherRoutes = require('../routes/teacherRoutes');
const teacherController = require('../controllers/teacherController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

jest.mock('../controllers/teacherController.js');
jest.mock('../middlewares/authMiddleware');

const app = express();

app.use('/teachers', teacherRoutes);

describe('GET /teachers', () => {
  it('should call isAuthenticated middleware and teacherController.getAllTeacher', async () => {
    // Mocking the isAuthenticated middleware to always call next()
    isAuthenticated.mockImplementation((req, res, next) => next());
    
    // Mocking the courseController.getAllCourse to send a response with 'All Teachers'
    teacherController.getAllTeacher.mockImplementation((req, res) => res.status(200).send('All Courses'));

    // Making a GET request to the /teachers route
    const response = await request(app).get('/courses');

    // Checking if the isAuthenticated middleware was called
    expect(isAuthenticated).toHaveBeenCalled();
    
    // Checking if the teacherController.getAllTeacher was called
    expect(courseController.getAllCourse).toHaveBeenCalled();
    
    // Checking if the response status is 200
    expect(response.status).toBe(200);
    
    // Checking if the response text is 'All Teachers'
    expect(response.text).toBe('All Teachers');
  });
});