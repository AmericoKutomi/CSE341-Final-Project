const db = require('../models/studentModel');
const ObjectId = require('mongodb').ObjectId
const { validationResult } = require('express-validator')
const GetAllStudents = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        const students = await db.getAll()
        res.setHeader('content-type', 'application/json')
        res.status(200).json(students)
    } catch (err) {
        res.status(500).json("Internal Error")
    }
}

const GetSingle = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(422).json("Invalid Id, please give a correct id")
            throw Error("Invalid Id, please give a correct id")
        }
        const student = await db.getSingle(req.params.id)
        if (!student) {
            res.status(404).send("Student not found")
        }
        else {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json(student)
        }

    } catch (error) {
        console.error(error)
        res.status(500).json("Internal error")
    }
}
const AddStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        validationResult(req).throw()
        const student =
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            phone_number: req.body.phone_number
        }
        const dataResult = await db.addStudent(student)
        if (dataResult) {
            res.status(201).send()
        } else {
            res.status(500).json(dataResult.error || 'Some error occured while adding the student.')
        }
    } catch (e) {
        res.status(422).json({ errors: e.mapped() })
    }

}
const UpdateStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(422).json("Invalid ID, please give a correct ID")
            throw Error("Invalid id")
        }
        const student =
        {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            phone_number: req.body.phone_number
        }
        const student_id = new ObjectId(req.params.id)
        const dataResult = await db.updateStudent(student, student_id)
        if (dataResult.modifiedCount === 0) {
            res.status(404).json({
                status: 'fail',
                msg: 'No student with ID ' + student_id + ' is found to update.'
            })
        }
        else if (dataResult > 0) {
            res.setHeader("Content-Type", "application/json")
            res.status(204).json('student was updated with success')
        } else {
            res.status(500).json(dataResult.error || 'Some error occured while update the student.')
        }
    } catch (error) {
        console.error(error)
    }


}
const DeleteStudent = async (req, res) => {
    //#swagger.tags=['Students']
    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(422).json("Invalid ID, please give a correct ID")
            throw Error("Invalid id")
        }
        const student_id = new ObjectId(req.params.id)
        const dataResult = await db.deleteStudent(student_id)
        if (dataResult === 0) {
            res.status(404).json({
                status: 'Fail',
                msg: 'No student with ID ' + student_id + ' was found to delete.'
            })
            throw Error(`No student with ID ${student_id} was found`)
        } else if (dataResult > 0) {
            return res.status(204).json({ status: "The record was deleted with success" })
        }
        else {
            res.status(500).json(dataResult.error || 'Some error occured while deleting the student.')
        }
    } catch (error) {
        console.error(error)
    }

}
module.exports = { GetAllStudents, GetSingle, DeleteStudent, UpdateStudent, AddStudent }