const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

const { Schema } = mongoose;
const ObjectID = mongoose.Types.ObjectId;

const EventSchema = new Schema({
  // Event Name
  name: {
    type: String,
    required: true,
  },

  // Host Organization
  organization: {
    type: ObjectID,
    ref: 'Organization',
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
    },
  },

  // State
  state: {
    type: String,
    enum: ['new', 'active', 'inactive'],
    default: 'new',
  },

  // Model Type
  model: {
    type: String,
    default: 'EVENT',
  },
});

EventSchema.plugin(mongooseFuzzySearching, { fields: ['name'] });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
