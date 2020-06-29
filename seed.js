/* eslint-disable no-console */
// Import Externals
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = require('./models');

const rounds = 10;

const accounts = [
  {
    email: 'seannyphoenix@gmail.com',
    password: 'coder',
  },
  {
    email: 'amadigan@gmail.com',
    password: 'test',
  },
];

async function hashPassword(account) {
  const hash = await bcrypt.hash(account.password, rounds);
  return { ...account, password: hash };
}

async function seed() {
  try {
    let deleted = await db.Account.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'accounts.');
    const hashedAccounts = await Promise.all(accounts.map(hashPassword));
    const created = await db.Account.create(hashedAccounts);
    console.log('Created', created.length, 'accounts.');

    deleted = await db.Session.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'sessions.');
  } catch (err) {
    console.warn(err);
  } finally {
    mongoose.connection.close();
  }
}

seed().catch(console.warn);
