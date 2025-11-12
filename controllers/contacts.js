const mongodb = require('../data/database');
const { ObjectId } = require('mongodb'); 

const getAll = async (req, res) => {
  // #swagger.tags=['Contacts']
  try {
    const db = mongodb.getDatabase().db('project1'); 
    const result = await db.collection('Contacts').find();
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve contacts.' });
  }
};

const getSingle = async (req, res) => {
  // #swagger.tags=['Contacts']
  try {
    const contactId = ObjectId(String(req.params.id));
    const db = mongodb.getDatabase().db('project1'); 
    const result = await db.collection('Contacts').find({ _id: contactId });
    const contacts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to retrieve contact.' });
  }
};

const createContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('Contacts').insertOne(contact);
  if (response.acknowledged) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'Some error occured while creating the contact.')
  }
};

const updateContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contactId = new ObjectId(String(req.params.id));
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDatabase().db().collection('Contacts').replaceOne({_id: contactId}, contact);
    if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while updating the contact.')
  }
};

const deleteContact = async (req, res) => {
  // #swagger.tags=['Contacts']
  const contactId = new ObjectId(String(req.params.id));
  const response = await mongodb.getDatabase().db().collection('Contacts').deleteOne({_id: contactId});
    if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occured while deleting the contact.')
  }
};

module.exports = { 
    getAll, 
    getSingle,
    createContact,
    updateContact,
    deleteContact
};