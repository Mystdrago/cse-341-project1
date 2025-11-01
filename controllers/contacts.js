const mongodb = require('../data/database');
const { ObjectId } = require('bson'); 

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase().db('project1'); 
    const result = await db.collection('contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve contacts.' });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = ObjectId.createFromHexString(req.params.id);
    const db = mongodb.getDatabase().db('project1'); 
    const result = await db.collection('contacts').find({ _id: contactId });
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve contact.' });
  }
};

module.exports = { 
    getAll, 
    getSingle 
};