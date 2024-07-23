// teachesRoutes.test.js
const request = require('supertest');
const express = require('express');
const teacherRoutes = require('../routes/teacherRoutes'); 
const teacherController = require('../controllers/teacherController'); 

const app = express();
app.use(express.json()); // Required to allow JSON parsing in the body of requests
app.use('/teachers', teacherRoutes);

// Authentication Middleware Mock
jest.mock('../middlewares/authMiddleware', () => ({
  isAuthenticated: (req, res, next) => next()
}));

// Mock of controller functions
jest.mock('../controllers/teacherController.js', () => ({
  getAllTeacher: jest.fn((req, res) => res.status(200).json([])),
  createTeacher: jest.fn((req, res) => res.status(201).json({ id: 1, name: 'Teacher' })),
  getSingleTeacher: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: 'Teacher' })),
  updateTeacher: jest.fn((req, res) => res.status(200).json({ id: req.params.id, name: 'Updated Teacher' })),
  deleteTeacher: jest.fn((req, res) => res.status(204).send())
}));

describe('Teacher Routes', () => {
  test('GET /Teacher should return all teachers', async () => {
    const response = await request(app).get('/teachers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /teacher should create a new teacher', async () => {
    const newTeacher = {
     
          name:"Ntyam Francky",
          email:"francky@example.com",
          phone_number:"123-456-7890",
          qualification:"Masters in Engineering of Telecommunications and Network Computer",
          experience:2,

          subjects_taught:
          ["Programming",
          "Database"]
    };
    const response = await request(app)
      .post('/teachers')
      .send(newTeacher);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, name: 'Teacher' });
  });
  
  test('GET /teachers/:id should return a single teacher', async () => {
    const response = await request(app).get('/teachers/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Teacher' });
  });

  test('PUT /teachers/:id should update a teacher', async () => {
    const updateTeacher = {
     
      name:"Ntyam Francky",
      email:"francky@example.com",
      phone_number:"123-456-7890",
      qualification:"Masters in Engineering of Telecommunications and Network Computer",
      experience:2,

      subjects_taught:
      ["Programming",
      "Database"]
};
    const response = await request(app)
      .put('/teachers/1')
      .send(updateTeacher);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Updated Teacher' });
  });

  test('DELETE /teachers/:id should delete a teacher', async () => {
    const response = await request(app).delete('/teachers/1');
    expect(response.status).toBe(204);
  });

});
