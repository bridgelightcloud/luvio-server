// Import Externals
const mongoose = require('mongoose');
require('dotenv').config();

const db = require('./models');

const seedData = {
  accounts: [
    {
      email: 'seannyphoenix@gmail.com',
      name: 'Boy Phoenix, Jack of Hearts',
    },
    {
      email: 'test@test.com',
      name: 'Testing Person',
    },
    {
      email: 'seannytrash@gmail.com',
      name: 'sillyboy',
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
      name: 'Heart Court Presents',
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
      if (thisOrg.members) {
        for (let y = 0; y < thisOrg.members.length; y++) {
          null;
        }
      }
      organizations.push(
        seedData.organizations[x],
      );
    }

    created = await db.Organization.create(organizations);
    console.log('Created', created.length, 'organizations.');

    // Events
    deleted = await db.Event.deleteMany({});
    console.log('Deleted', deleted.deletedCount, 'events.');
    for (let i = 0; i < seedData.events.length; i++) {
      const element = seedData.events[i];
      const org = db.Organization.find({ name: element.organization });
      element.organization = org.id;
    }
    created = await db.Event.create(seedData.events);
    console.log('Created', created.length, 'events.');

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
