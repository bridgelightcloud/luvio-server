const mongoose = require('mongoose');
const utilities = require('../utilities');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const TokenSchema = new Schema({
  account: {
    type: ObjectID,
    ref: 'Account',
  },
  expiration: {
    type: Number,
    default: utilities.Expiration.setExpiration,
  },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
