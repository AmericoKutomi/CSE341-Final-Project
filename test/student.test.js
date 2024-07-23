const request = require('supertest');
const express = require('express');
const studentRoutes = require('../routes/studentRoutes');
const db = require('../models/studentModel');
const app = express();
const { ObjectId } = require('mongodb');

app.use(express.json());
app.use('/api', studentRoutes);

jest.mock('../models/studentModel');

// Example student data with a valid ObjectId
const validObjectId = new ObjectId().toHexString();
const mockStudent = {
    _id: validObjectId,
    first_name: 'Jarom',
    last_name: "Mariscal",
    email: 'jarom@example.com',
    address: "Fake address 201",
    gender: "Male",
    birthdate: "1992-12-12",
    phone_number: "644-211-2341"
};

// Mock implementations for database methods
db.getAll.mockResolvedValue([mockStudent]);
db.getSingle.mockResolvedValue(mockStudent);
db.addStudent.mockResolvedValue(mockStudent);
db.updateStudent.mockResolvedValue(mockStudent);
db.deleteStudent.mockResolvedValue(true);

describe('Student Routes', () => {
    it('should get all students', async () => {
        const res = await request(app).get('/api/students');
        expect(res.status).toBe(200);
        expect(res.body).toEqual([mockStudent]);
    });

    it('should get a single student by ID', async () => {
        const res = await request(app).get(`/api/students/${validObjectId}`);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(mockStudent);
    });

    it('should create a new student', async () => {
        const res = await request(app)
            .post('/api/students')
            .send({
                first_name: "Any",
                last_name: "Any lastname",
                email: "any23@gmail.com",
                address: "Any address",
                gender: "Male",
                birthdate: "2001-04-12",
                phone_number: "642-233-1245"
            });
        expect(res.status).toBe(201);
    });

    it('should update a student by ID', async () => {
        const res = await request(app)
            .put(`/api/students/${validObjectId}`)
            .send({
                first_name: "new",
                last_name: "new lastname",
                email: "any23@gmail.com",
                address: "Any address",
                gender: "Male",
                birthdate: "2001-04-12",
                phone_number: "000-212-2342"
            });
        expect(res.status).toBe(200);
    });

    it('should delete a student by ID', async () => {
        const res = await request(app).delete(`/api/students/${validObjectId}`);
        expect(res.status).toBe(200);
    });
});
