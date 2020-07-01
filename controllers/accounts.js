/* eslint-disable no-console */
const db = require('../models');
const util = require('../utilities');

async function create(req, res) {
  try {
    if (!req.body.email) {
      util.Error.throwError(400);
    }
    const data = {
      email: req.body.email.toLowerCase(),
    };
    const duplicate = await db.Account.findOne(data);
    if (duplicate) {
      util.Error.throwError(409);
    }
    const newAccount = await db.Account.create(data);
    res.status(201).json(newAccount);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function index(req, res) {
  try {
    const indexAccounts = await db.Account.find();
    res.json(indexAccounts);
  } catch (err) {
    console.log(err);
  }
}

async function lookup(req, res) {
  try {
    const { email } = req.params;
    util.Error.validateExists(email);
    const account = await db.Account.findOne({ email });
    util.Error.validateExists(account);
    res.sendStatus(200);
  } catch (err) {
    util.Error.handleErrors(err, res);
  }
}

async function show(req, res) {
  try {
    const showAccount = await db.Account.findById(req.params.id);
    res.json(showAccount);
  } catch (err) {
    console.log(err);
  }
}

async function update(req, res) {
  try {
    const updateAccount = await db.Account.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.json(updateAccount);
  } catch (err) {
    console.warn(err);
  }
}

async function deactivate(req, res) {
  try {
    const deactivateAccount = await db.Account.findByIdAndUpdate(
      req.params.id,
      { active: false },
      { new: true },
    );
    res.json(deactivateAccount);
  } catch (err) {
    console.warn(err);
  }
}

module.exports = {
  create,
  index,
  lookup,
  show,
  update,
  deactivate,
};
