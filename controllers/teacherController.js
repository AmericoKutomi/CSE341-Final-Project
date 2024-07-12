const mongodb = require('../database/connect')
const ObjectId = require('mongodb').ObjectId

const getAllTeacher = async (req, res) => {
    const dataResult = await mongodb.getDb().db().collection('teachers').find().toArray().then((teachers) => {
        res.setHeader('content-type', 'application/json')
        res.status(200).json(teachers)
    })
}

const getSingleTeacher = async (req, res) => {
   
    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid contact id to get that contact.')
            }
    const teacher_id = new ObjectId(req.params.id);
    try{
        const result = await mongodb.getDb().db().collection('teachers').find({_id: teacher_id});
        result.toArray().then((teacher)=> {
            if (!teacher[0]){
                return res.status(404).json({error: 'Contact not found'})
            }else{
                res.setHeader('content-type', 'application/json');
              return  res.status(200).json(teacher[0]);
            }
       
        });
    }catch(error){
console.log(error)
return res.status(500).json({error: 'Internal Server'})
    }
   
   
};

const CreateTeacher = async (req, res) => {
    const teacher = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        qualification: req.body.qualification,
        experience: req.body.experience,
        subjects_taught: req.body.subjects_taught
    }
    const dataResult = await mongodb.getDb().db().collection('teachers').insertOne(teacher)
    if(dataResult.acknowledged){
        res.status(201).send()
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while create the teacher.')
    }
}

const updateTeacher = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id teacher to update a teacher.')
    }
    const teacher_id = new ObjectId(req.params.id)
    const teacher = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        qualification: req.body.qualification,
        experience: req.body.experience,
        subjects_taught: req.body.subjects_taught
       
    }
    
    const dataResult = await mongodb.getDb().db().collection('teachers').replaceOne({_id: teacher_id}, teacher, {runValidators: true})
    
    if(dataResult.modifiedCount === 0){
        res.status(404).json({status:'fail',
        msg: 'No teacher with ID ' +teacher_id+' is found to update.'})
    }
    if(dataResult.modifiedCount > 0){
        res.status(204).json('teacher updated')
    }else{
        res.status(500).json(dataResult.error || 'Some error occured while update the teacher.')
    }
}

const deleteTeacher = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).json('Must use valid id teacher to delete a teacher.')
    }

    const teacher_id = new ObjectId(req.params.id)
    
    const dataResult = await mongodb.getDb().db().collection('teachers').deleteOne({_id: teacher_id}, true)
   
    if(dataResult.deletedCount === 0 & dataResult.acknowledged === true){
        return res.status(404).json({
            status:'fail',
            msg:'No teacher with ID ' +teacher_id+' is found to delete.'
        })
       
    } else if(dataResult.deletedCount > 0 & dataResult.acknowledged === true){
       return res.status(204).json({status:"success"})
    }
    else{
        res.status(500).json(dataResult.error || 'Some error occured while delete the teacher.')
    }
}


module.exports = {getAllTeacher, getSingleTeacher, CreateTeacher, updateTeacher, deleteTeacher}