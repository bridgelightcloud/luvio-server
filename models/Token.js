const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const TokenSchema = new Schema({
  account: {
    type: ObjectID,
    ref: 'Account',
  },
  expiration: {
    type: Date,
    default: Date.now() + (1000 * 60 * 15),
  },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
