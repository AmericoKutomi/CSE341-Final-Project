const request = require('supertest');
const express = require('express');
const courseRoutes = require('../routes/courseRoutes');
const courseController = require('../controllers/courseController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

jest.mock('../controllers/courseController');
jest.mock('../middlewares/authMiddleware');

const app = express();

app.use('/courses', courseRoutes);

describe('GET /courses', () => {
  it('should call isAuthenticated middleware and courseController.getAllCourse', async () => {
    // Mocking the isAuthenticated middleware to always call next()
    isAuthenticated.mockImplementation((req, res, next) => next());
    
    // Mocking the courseController.getAllCourse to send a response with 'All Courses'
    courseController.getAllCourse.mockImplementation((req, res) => res.status(200).send('All Courses'));

    // Making a GET request to the /courses route
    const response = await request(app).get('/courses');

    // Checking if the isAuthenticated middleware was called
    expect(isAuthenticated).toHaveBeenCalled();
    
    // Checking if the courseController.getAllCourse was called
    expect(courseController.getAllCourse).toHaveBeenCalled();
    
    // Checking if the response status is 200
    expect(response.status).toBe(200);
    
    // Checking if the response text is 'All Courses'
    expect(response.text).toBe('All Courses');
  });
});