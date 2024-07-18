const db = require('../models/courseModel');
const ObjectId = require('mongodb').ObjectId

const getAllCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try{
        const courses = await db.getAll();
        res.setHeader('content-type', 'application/json')
        res.status(200).json(courses);
    } catch (error){
        res.status(500).json(error)
    }
}

const getSingleCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        if(!ObjectId.isValid(req.params.id)){
            res.status(422).json("Invalid Id, please give a correct id");
            throw Error("Invalid Id, please give a correct id");
        }
        const course = await db.getSingle(req.params.id);
        if (course){
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(course);
        } else { 
            res.status(404).json({error: 'Course not found'})
        };   
    } catch (error){
        res.status(500).json('Internal error');
    }
};

const createCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        const course = {
            name: req.body.name,
            description: req.body.description,
            prerequisites: req.body.prerequisites,
            syllabus: req.body.syllabus,
            duration: req.body.duration,
            delivery_mode: req.body.delivery_mode,
            tuition_fee: req.body.tuition_fee
        };
        const dataResult = await db.createCourse(course);
        if (dataResult) {
            res.status(201).send();
        } else {
            res.status(500).json(dataResult.error || 'Some error occurred while creating the course.');
        }
    } catch (error) {
        res.status(500).json('Internal error');
    }
}

const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        if(!ObjectId.isValid(req.params.id)){
            res.status(422).json("Invalid Id, please give a correct id");
            throw Error("Invalid Id, please give a correct id");
        }
        const course = {
            name: req.body.name,
            description: req.body.description,
            prerequisites: req.body.prerequisites,
            syllabus: req.body.syllabus,
            duration: req.body.duration,
            delivery_mode: req.body.delivery_mode,
            tuition_fee: req.body.tuition_fee
        };
        const dataResult = await db.updateCourse(course, req.params.id);
        if(dataResult){
            res.status(200).send();
        } else {
            res.status(500).json(dataResult.error || 'Some error occured while updating the course.');
        }
    } catch (error) {
        res.status(500).json('Internal error 1');
    }
}

const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    try {
        if(!ObjectId.isValid(req.params.id)){
            res.status(400).json('Must use valid id course to delete a course.')
        }
        const dataResult = await db.deleteCourse(req.params.id);
        if(dataResult){
            res.status(200).send()
        } else {
            res.status(500).json(dataResult.error || 'Some error occured while delete the course.')
        };
    } catch (error) {
        res.status(500).json('Internal error');
    }
}

module.exports = { getAllCourse, getSingleCourse, createCourse, updateCourse, deleteCourse };