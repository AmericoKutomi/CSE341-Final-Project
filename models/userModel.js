const mongodb = require('../database/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async () => {
  try {
    const db = mongodb.getDb().db();
    const users = await db.collection('users').find().toArray();
    return users;
  } catch (error) {
    console.error('Error while getting the users', error);
    return [];
  }
};

const getSingle = async (id) => {
  const userId = new ObjectId(id);
  try {
    const db = mongodb.getDb().db();
    const user = await db.collection('users').findOne({ _id: userId });
    return user;
  } catch (error) {
    console.error('Error while getting the user', error);
    return null;
  }
};

const createUser = async (data) => {
  const user = {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role
  };
  try {
    const response = await mongodb.getDb().db().collection('users').insertOne(user);
    return response.insertedId;
  } catch (error) {
    console.error('Error while creating user', error);
    return null;
  }
};

const updateUser = async (data, id) => {
  const userId = new ObjectId(id);
  const user = {
    username: data.username,
    email: data.email,
    password: data.password,
    role: data.role
  };
  try {
    const response = await mongodb.getDb().db().collection('users').updateOne({ _id: userId }, { $set: user });
    return response.modifiedCount > 0;
  } catch (error) {
    console.error('Error while updating user', error);
    return false;
  }
};

const deleteUser = async (id) => {
  const userId = new ObjectId(id);
  try {
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });
    return response.deletedCount > 0;
  } catch (error) {
    console.error('Error while deleting user', error);
    return false;
  }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
