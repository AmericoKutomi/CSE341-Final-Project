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
    isAuthenticated.mockImplementation((req, res, next) => next());
    courseController.getAllCourse.mockImplementation((req, res) => res.status(200).send('All Courses'));

    const response = await request(app).get('/courses');

    expect(isAuthenticated).toHaveBeenCalled();
    expect(courseController.getAllCourse).toHaveBeenCalled();
    expect(response.status).toBe(200);
    expect(response.text).toBe('All Courses');
  });
});