const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const OrganizationSchema = new Schema({
  // Organization Name
  name: {
    type: String,
    required: true,
    unique: true,
  },

  // Member List
  members: [{
    // Member Account
    account: {
      type: ObjectID,
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
      type: ObjectID,
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
