const mongodb = require('../database/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async () => {
    try {
        const db = mongodb.getDb().db();
        const lists = await db.collection('students').find().toArray();
        return lists;
    } catch (error) {
        console.error('Error while searching for the students', error);
        return [];
    }
};

const getSingle = async (id) => {
    const studentId = new ObjectId(id);
    try {
        const db = mongodb.getDb().db();
        const lists = await db.collection('students').find(studentId).toArray();
        return lists[0];
    } catch (error) {
        console.error('An Error happened while searching for the query', error);
        return {};
    }
};

const addStudent = async (data) => {
    const student = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        address: data.address,
        gender: data.gender,
        birthdate: data.birthdate,
        phone_number: data.phone_number
    }
    const response = await mongodb.getDb().db().collection('students').insertOne(student);
    if (response.acknowledged) {
        return response.insertedId;
    } else {
        return null;
    }
};

const updateStudent = async (data, id) => {
    const studentId = new ObjectId(id);
    const student = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        address: data.address,
        gender: data.gender,
        birthdate: data.birthdate,
        phone_number: data.phone_number
    }
    const response = await mongodb.getDb().db().collection('students').replaceOne({ _id: studentId }, student);
    if (response.modifiedCount > 0) {
        return true;
    } else {
        return false;
    }

};

const deleteStudent = async (id) => {
    const studentId = new ObjectId(id);
    const response = await mongodb.getDb().db().collection('students').deleteOne({ _id: studentId });
    if (response.deletedCount > 0) {
        return true;
    } else {
        return false;
    }
};

module.exports = { getAll, getSingle, addStudent, updateStudent, deleteStudent };