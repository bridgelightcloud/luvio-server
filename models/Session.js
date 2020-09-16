const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const utilities = require('../utilities');

const { Schema } = mongoose;

const SessionSchema = new Schema({
  // Use UUIDv4 for document id
  _id: {
    type: String,
    default: uuidv4,
  },

  // Account for this session - UUID
  account: {
    type: String,
    ref: 'Account',
  },

  // Session Expiration - 15 minutes from last access
  expiration: {
    type: Number,
    default: utilities.Expiration.setExpiration,
  },
});

SessionSchema.methods.refresh = function refresh() {
  this.expiration = utilities.Expiration.setExpiration();
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
