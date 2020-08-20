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
    type: Number,
    default: moment().add(15, 'minutes').unix(),
  },
});

SessionSchema.methods.refresh = () => {
  this.expiration = moment().add(15, 'minutes').unix();
};

const Session = mongoose.model('Session', SessionSchema);

module.exports = Session;
