const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const utilities = require('../utilities');

const { Schema } = mongoose;

const TokenSchema = new Schema({
  // Use UUIDv4 for document id
  _id: {
    type: String,
    default: uuidv4,
  },

  // Associated Account - UUID
  account: {
    type: String,
    ref: 'Account',
    required: true,
  },

  // Session Expiration - 15 minutes from creation
  expiration: {
    type: Number,
    default: utilities.Expiration.setExpiration,
  },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
