const mongodb = require('../database/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async () => {
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('courses').find().toArray();
    return lists;
  } catch (error) {
    console.error('Error while getting the courses', error);
    return [];
  }
};

const getSingle = async (id) => {
  const courseId = new ObjectId(id);
  try {
    const db = mongodb.getDb().db();
    const lists = await db.collection('courses').find(courseId).toArray();
    return lists[0];
    } catch (error) {
        console.error('Error while getting the course', error);
        return {}; 
    }
};

const createCourse = async (data) => {
  const course = {
    name: data.name,
    description: data.description,
    lastName: req.body.lastName,
    prerequisites: data.prerequisites,
    syllabus: data.syllabus,
    duration: data.duration,
    delivery_mode: data.delivery_mode,
    tuition_fee: data.tuition_fee
  }
    const response = await mongodb.getDb().db().collection('courses').insertOne(course);
    if (response.acknowledged) {
        return response.insertedId;
    } else {
        return null;
    }
};
  
const updateCourse = async (data, id) => {
  const courseId = new ObjectId(id);
  const course = {
    name: data.name,
    description: data.description,
    lastName: req.body.lastName,
    prerequisites: data.prerequisites,
    syllabus: data.syllabus,
    duration: data.duration,
    delivery_mode: data.delivery_mode,
    tuition_fee: data.tuition_fee
   }
  const response = await mongodb.getDb().db().collection('courses').replaceOne({ _id: courseId } ,course);
  if (response.modifiedCount > 0)     {
    return true;
  } else {
    return false;
  }

  };

  const deleteCourse = async (id) => {
    const courseId = new ObjectId(id);
    const response = await mongodb.getDb().db().collection('courses').deleteOne({ _id: courseId});
    if (response.deletedCount > 0) {
      return true;
    } else {
      return false;
    }
  };
  
module.exports = { getAll, getSingle, createCourse, updateCourse, deleteCourse };