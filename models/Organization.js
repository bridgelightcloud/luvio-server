const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const OrganizationSchema = new Schema({
  // Use UUIDv4 for document id
  _id: {
    type: String,
    default: uuidv4,
  },

  // Organization Name
  name: {
    type: String,
    required: true,
    unique: true,
  },

  // Member List
  members: [{
    // Member Account - UUID
    account: {
      type: String,
      ref: 'Account',
    },
    // Whether the Member is an Admin
    admin: {
      type: Boolean,
      default: false,
    },
  }],

  // Event List
  events: [{
    event: {
      type: String,
      ref: 'Event',
    },
  }],

  // Active
  active: {
    type: Boolean,
    default: true,
  },
});

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
