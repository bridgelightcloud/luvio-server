const db = require('../models');
const util = require('../utilities');

const returnNew = { new: true };

async function create(req, res) {
  try {
    // Get data
    const data = req.body;
    util.Error.validateExists(data);
    // Validate session and get account
    const account = await util.Session.getSessionAccount(req);
    // Check that this is a unique name
    const existingOrg = await db.Organization.findOne({ name: data.name });
    if (existingOrg) {
      util.Error.throwError(409);
    }
    // Set this account as an admin
    data.members = [{
      account,
      admin: true,
    }];
    // Create and return the new organization
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
    const account = await util.Session.getSessionAccount(req);
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
    // Validate session and get account
    const account = await util.Session.getSessionAccount(req);
    // Get and validate ID
    const { id } = req.params;
    util.Error.validateObjectId(id);
    // Find organization
    const deactivatedOrganization = await db.Organization.findById(id);
    util.Error.validateExists(deactivatedOrganization);
    // Make sure account is an admin
    const admin = deactivatedOrganization.members
      .filter((member) => member.account === account && member.admin);
    if (!admin) {
      util.Error.throwError(403);
    }
    // Update, save, and return organization
    deactivatedOrganization.active = false;
    await deactivatedOrganization.save();
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
