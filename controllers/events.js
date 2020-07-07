const db = require('../models');
const util = require('../utilities');

const returnNew = { new: true };
const deactivate = { active: false };

async function create(req, res) {
  try {
    const data = req.body;
    util.Error.validateExists(data.name);
    const duplicate = await db.Event.findOne(data);
    if (duplicate) {
      util.Error.throwError(409);
    }
    const newEvent = await db.Event.create(data);
    res.status(201).json(newEvent);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function index(req, res) {
  try {
    const indexEvents = await db.Event.find();
    res.json(indexEvents);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    const showEvent = await db.Event.findById(req.params.id);
    res.json(showEvent);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    util.Error.validateObjectId(id);
    const updateEvent = await db.Event.findByIdAndUpdate(id, data, returnNew);
    res.json(updateEvent);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function cancel(req, res) {
  try {
    const { id } = req.params;
    util.Error.validateObjectId(id);
    const deactivateEvent = await db.Event.findByIdAndUpdate(id, deactivate, returnNew);
    res.json(deactivateEvent);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  cancel,
};
