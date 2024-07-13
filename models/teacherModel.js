const mongodb = require('../database/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async () => {
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('teachers').find().toArray();
    return lists;
  } catch (error) {
    console.error('Error while getting the teacher', error);
    return [];
  }
};

const getSingle = async (id) => {
  const teacher_id = new ObjectId(id);
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('teachers').find(teacher_id).toArray();
    return lists[0];
    } catch (error) {
        console.error('Error while getting the teacher', error);
        return {}; 
    }
};

const createTeacher = async (data) => {
    const teacher = {
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        qualification: data.qualification,
        experience: data.experience,
        subjects_taught: data.subjects_taught
    }
    const response = await mongodb.getDb().db().collection('teachers').insertOne(teacher);
    if (response.acknowledged) {
        return response.insertedId;
    } else {
        return null;
    }
};
  
const updateTeacher = async (data, id) => {
  const teacher_id = new ObjectId(id);
  const teacher = {
    name: data.name,
    email: data.email,
    phone_number: data.phone_number,
    qualification: data.qualification,
    experience: data.experience,
    subjects_taught: data.subjects_taught
}
  const response = await mongodb.getDb().db().collection('teachers').replaceOne({ _id: teacher_id } ,teacher);
  if (response.modifiedCount > 0)     {
    return true;
  } else {
    return false;
  }

  };

  const deleteTeacher = async (id) => {
    const teacher_id = new ObjectId(id);
    const response = await mongodb.getDb().db().collection('teachers').deleteOne({ _id: teacher_id});
    if (response.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  };
  
module.exports = { getAll, getSingle, createTeacher, updateTeacher, deleteTeacher };