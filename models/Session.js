const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const SessionSchema = new Schema({
  account: {
    type: ObjectID,
    ref: 'Account',
  },
  expiration: {
    type: Date,
    default: Date.now() + (1000 * 60 * 60),
  },
});

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
