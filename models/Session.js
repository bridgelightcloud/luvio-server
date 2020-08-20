const mongoose = require('mongoose');
const utilities = require('../utilities');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const SessionSchema = new Schema({
  account: {
    type: ObjectID,
    ref: 'Account',
  },
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
