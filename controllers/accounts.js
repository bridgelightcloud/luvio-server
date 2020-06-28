/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const db = require('../models');

const rounds = parseInt(process.env.SALT_ROUNDS, 10);

async function create(req, res) {
  try {
    const hash = await bcrypt.hash(req.body.password, rounds);
    const newAccount = await db.Account.create(
      {
        email: req.body.email,
        password: hash,
      },
    );
    res.json(newAccount);
  } catch (err) {
    console.warn(err);
  }
}

async function index(req, res) {
  try {
    const indexAccounts = await db.Account.find();
    res.json(indexAccounts);
  } catch (err) {
    console.warn(err);
  }
}

async function show(req, res) {
  try {
    const showAccount = await db.Account.findById(req.params.id);
    res.json(showAccount);
  } catch (err) {
    console.warn(err);
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
