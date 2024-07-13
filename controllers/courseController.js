const db = require('../models/courseModel');
const ObjectId = require('mongodb').ObjectId


const getAllCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const courses = await db.getAll();
    res.json(courses);
}

const getSingleCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid course id to get that course.')
    }
    const course = await db.getSingle(req.params.id);
    if (course){
        res.status(200).json(course)
    } else { 
        res.status(404).json({error: 'Course not found'})
    };   
};

const createCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    const course = {
        name: req.body.name,
        description: req.body.description,
        prerequisites: req.body.prerequisites,
        syllabus: req.body.syllabus,
        duration: req.body.duration,
        delivery_mode: req.body.delivery_mode,
        tuition_fee: req.body.tuition_fee
        }
    const dataResult = await db.createCourse(course)
    if(dataResult){
        res.status(201).send()
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while create the course.')
    }
}

const updateCourse = async (req, res) => {
    //#swagger.tags=['Courses']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id course to update a course.')
    }
    const course = {
        name: req.body.name,
        description: req.body.description,
        prerequisites: req.body.prerequisites,
        syllabus: req.body.syllabus,
        duration: req.body.duration,
        delivery_mode: req.body.delivery_mode,
        tuition_fee: req.body.tuition_fee
    }
    const dataResult = await db.updateCourse(course, req.params.id);
    if(dataResult){
        res.status(200).send()
    } else {
        res.status(500).json(dataResult.error || 'Some error occured while update the course.')
    };
}

const deleteCourse = async (req, res) => {
    //#swagger.tags=['Courses']

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id course to delete a course.')
    }
    const dataResult = await db.deleteCourse(req.params.id);
    if(dataResult){
        res.status(200).send()
    } else {
        res.status(500).json(dataResult.error || 'Some error occured while delete the course.')
    };
}

module.exports = { getAllCourse, getSingleCourse, createCourse, updateCourse, deleteCourse };