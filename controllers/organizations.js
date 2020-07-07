const db = require('../models');
const util = require('../utilities');

const returnNew = { new: true };

async function create(req, res) {
  try {
    const organization = await db.Organization.create(req.body);
    res.json(organization);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function index(req, res) {
  try {
    const organizations = await db.Organization.find({});
    res.json(organizations);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    const { id } = req.params;
    util.Error.validateObjectId(id);
    const organization = await db.Organization.findById(id);
    util.Error.validateExists(organization);
    res.json(organization);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    util.Error.validateObjectId(id);
    const data = req.body;
    const updatedOrganization = await db.Organization.findByIdAndUpdate(id, data, returnNew);
    res.json(updatedOrganization);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function deactivate(req, res) {
  try {
    const { id } = req.params;
    util.Error.validateObjectId(id);
    const data = { active: false };
    const deactivatedOrganization = await db.Organization.findByIdAndUpdate(id, data, returnNew);
    res.json(deactivatedOrganization);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

module.exports = {
  create,
  index,
  show,
  update,
  deactivate,
};
