const db = require('../models/userModel'); // Assuming you have a userModel for MongoDB
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
    //#swagger.tags=['users']
    try {
        const users = await db.getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getSingleUser = async (req, res) => {
    //#swagger.tags=['users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to get that user.');
    }
    try {
        const user = await db.getSingle(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createUser = async (req, res) => {
    //#swagger.tags=['users']
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, //  BCRYPT hash passwords before saving in production
        role: req.body.role // Assuming you have roles like student, teacher, admin, etc.
    };
    try {
        const dataResult = await db.createUser(user);
        res.status(201).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    //#swagger.tags=['users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to update a user.');
    }
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    };
    try {
        const dataResult = await db.updateUser(user, req.params.id);
        if (dataResult) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['users']
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Must use a valid user id to delete a user.');
    }
    try {
        const dataResult = await db.deleteUser(req.params.id);
        if (dataResult) {
            res.status(200).send();
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllUsers, getSingleUser, createUser, updateUser, deleteUser };
