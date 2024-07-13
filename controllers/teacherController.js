const db = require('../models/teacherModel')
const ObjectId = require('mongodb').ObjectId

const getAllTeacher = async (req, res) => {
   //#swagger.tags=['Teachers']
   const teachers = await db.getAll();
        res.setHeader('content-type', 'application/json')
        res.status(200).json(teachers)
    
}

const getSingleTeacher = async (req, res) => {
    //#swagger.tags=['Teachers']
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid contact id to get that contact.')
            }
    
    try{
        const teacher = await db.getSingle(req.params.id);
            if (!teacher){
                return res.status(404).json({error: 'Teacher not found'})
            }else{
                res.setHeader('content-type', 'application/json');
              return  res.status(200).json(teacher);
            }
       
        
    }catch(error){
console.log(error)
return res.status(500).json({error: 'Internal Server'})
    }
   
   
};

const CreateTeacher = async (req, res) => {
     //#swagger.tags=['Teachers']
    const teacher = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        qualification: req.body.qualification,
        experience: req.body.experience,
        subjects_taught: req.body.subjects_taught
    }
    const dataResult = await db.createTeacher(teacher)
    if(dataResult){
        res.status(201).send()
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while create the teacher.')
    }
}

const updateTeacher = async (req, res) => {
     //#swagger.tags=['Teachers']

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id teacher to update a teacher.')
    }
    
    const teacher = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        qualification: req.body.qualification,
        experience: req.body.experience,
        subjects_taught: req.body.subjects_taught
       
    }
    
    const dataResult = await db.updateTeacher(teacher, req.params.id)
    
    if(dataResult.modifiedCount === 0){
        res.status(404).json({status:'fail',
        msg: 'No teacher with ID ' +teacher_id+' is found to update.'})
    }
    if(dataResult){
        res.status(204).json('teacher updated')
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while update the teacher.')
    }
}

const deleteTeacher = async (req, res) => {
     //#swagger.tags=['Teachers']

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id teacher to delete a teacher.')
    }

    
    const dataResult = await db.deleteTeacher(req.params.id)
   
    if(dataResult === 0 ){
        return res.status(404).json({
            status:'fail',
            msg:'No teacher with ID ' +teacher_id+' is found to delete.'
        })
       
    } else if(dataResult > 0){
       return res.status(204).json({status:"success"})
    }
    else{
        res.status(500).json(dataResult.error || 'Some error occured while delete the teacher.')
    }
}


module.exports = {getAllTeacher, getSingleTeacher, CreateTeacher, updateTeacher, deleteTeacher}