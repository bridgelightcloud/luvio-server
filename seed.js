/* eslint-disable no-console */
// Import Externals
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./models');

const accounts = [
  {
    email: 'seannyphoenix@gmail.com',
  },
];

async function seed() {
  try {
    let deleted = await db.Account.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'accounts.');
    const created = await db.Account.create(accounts);
    console.log('Created', created.length, 'accounts.');

    deleted = await db.Session.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'sessions.');

    deleted = await db.Token.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'tokens.');
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.connection.close();
  }
}

seed().catch(console.warn);
