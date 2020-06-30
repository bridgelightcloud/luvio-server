/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const db = require('../models');
const util = require('../utilities');

const rounds = parseInt(process.env.SALT_ROUNDS, 10);

async function create(req, res) {
  try {
    if (!req.body.email || !req.body.password) {
      util.Error.throwError(400);
    }
    const data = {
      email: req.body.email.toLowerCase(),
      password: await bcrypt.hash(req.body.password, rounds),
    };
    const duplicate = await db.Account.findOne({ email: data.email });
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
  show,
  update,
  deactivate,
};
