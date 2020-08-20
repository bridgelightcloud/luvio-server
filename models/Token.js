const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const TokenSchema = new Schema({
  account: {
    type: ObjectID,
    ref: 'Account',
  },
  expiration: {
    type: Number,
    default: moment().add(15, 'minutes').unix(),
  },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
