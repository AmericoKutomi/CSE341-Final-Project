const db = require('../models/studentModel');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const GetAllStudents = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const students = await db.getAll();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json("Internal Error");
    }
};

const GetSingle = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(422).json("Invalid Id, please provide a correct id");
        }
        const student = await db.getSingle(req.params.id);
        if (!student) {
            return res.status(404).send("Student not found");
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal error");
    }
};

const AddStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //console.log(errors.array()); // Log the errors for debugging
        return res.status(422).json({ errors: errors.array() });
      }
  
      const student = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
        phone_number: req.body.phone_number
      };
  
      const dataResult = await db.addStudent(student);
      if (dataResult) {
        return res.status(201).json({ insertedId: dataResult });
      } else {
        return res.status(500).json({ error: 'Some error occurred while adding the student.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

const UpdateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(422).json("Invalid ID, please provide a correct ID");
        }
        const student = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            phone_number: req.body.phone_number
        };
        const student_id = new ObjectId(req.params.id);
        const dataResult = await db.updateStudent(student, student_id);
        if (dataResult.modifiedCount === 0) {
            return res.status(404).json({
                status: 'fail',
                msg: 'No student with ID ' + student_id + ' is found to update.'
            });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal error");
    }
};

const DeleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(422).json("Invalid ID, please provide a correct ID");
        }
        const student_id = new ObjectId(req.params.id);
        const dataResult = await db.deleteStudent(student_id);
        if (dataResult === 0) {
            return res.status(404).json({
                status: 'Fail',
                msg: 'No student with ID ' + student_id + ' was found to delete.'
            });
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal error");
    }
};

module.exports = { GetAllStudents, GetSingle, DeleteStudent, UpdateStudent, AddStudent };
