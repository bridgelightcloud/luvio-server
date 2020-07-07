const mongoose = require('mongoose');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const EventSchema = new Schema({
  // Host Organization
  organization: {
    type: ObjectID,
    ref: 'Organization',
    required: true,
  },

  // Host List
  hosts: [{
    // Host Account
    account: {
      type: ObjectID,
      ref: 'Account',
      required: true,
    },
  }],

  // Performer List
  performers:
  {
    // Performer Account
    account: {
      type: ObjectID,
      ref: 'Account',
      required: true,
    },
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
