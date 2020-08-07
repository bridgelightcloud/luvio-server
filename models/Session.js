const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const SessionSchema = new Schema({
  account: {
    type: ObjectID,
    ref: 'Account',
  },
  expiration: {
    type: String,
    // 15 minutes
    default: moment.utc().add(15, 'minutes'),
  },
});

SessionSchema.methods.refresh = () => {
  this.expiration = moment.utc().add(15, 'minutes');
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
