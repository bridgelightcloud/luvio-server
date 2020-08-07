// Import Externals
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./models');

const seedData = {
  accounts: [
    {
      email: 'seannyphoenix@gmail.com',
    },
    {
      email: 'test@test.com',
    },
  ],
  organizations: [
    {
      name: 'Grand Ducal Council',
      members: [
        {
          email: 'seannyphoenix@gmail.com',
        },
        {
          email: 'test@test.com',
        },
      ],
    },
    {
      name: 'Hamburger Marys',
    },
  ],
  events: [
    {
      organization: 'Grand Ducal Council',
    },
  ],
};

async function seed() {
  try {
    // Accounts
    let deleted = await db.Account.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'accounts.');
    let created = await db.Account.create(seedData.accounts);
    console.log('Created', created.length, 'accounts.');

    // Organizations
    deleted = await db.Organization.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'organizations.');
    const organizations = [];
    for (let x = 0; x < seedData.organizations.length; x++) {
      const thisOrg = seedData.organizations[x];
      console.log(thisOrg);
      if (thisOrg.members) {
        for (let y = 0; y < thisOrg.members.length; y++) {
          null;
        }
      }
      organizations.push(
        seedData.organizations[x],
      );
    }

    console.log(organizations);

    created = await db.Organization.create(organizations);
    console.log('Created', created.length, 'organizations.');

    // Events

    // Sessions
    deleted = await db.Session.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'sessions.');

    // Magic Link Tokens
    deleted = await db.Token.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'tokens.');
  } catch (err) {
    console.log(err);
  } finally {
    // Always Close Connection
    mongoose.connection.close();
  }
}

seed().catch(console.warn);
