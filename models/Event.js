const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const EventSchema = new Schema({
  // Use UUIDv4 for document id
  _id: {
    type: String,
    default: uuidv4,
  },

  // Event Name
  name: {
    type: String,
    required: true,
  },

  // Host Organization - UUID
  organization: {
    type: String,
    ref: 'Organization',
  },

  // Host List
  hosts: [{
    // Host Account - UUID
    account: {
      type: String,
      ref: 'Account',
      required: true,
    },
  }],

  // Performer List
  performers:
  {
    // Performer Account - UUID
    account: {
      type: String,
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
    enum: ['EVENT'],
    default: 'EVENT',
  },
});

EventSchema.plugin(mongooseFuzzySearching, { fields: ['name'] });

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
