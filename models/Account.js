const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  // Use UUIDv4 for document id
  _id: {
    type: String,
    default: uuidv4,
  },

  // Email address of the account
  email: {
    type: String,
    required: true,
    unique: true,
  },

  // Display name
  name: String,

  // Bucket url of profile pic
  picUrl: String,

  // Flag of whether or not the account is a performer
  performer: {
    type: Boolean,
    default: false,
  },

  // Account state
  state: {
    type: String,
    enum: ['new', 'active', 'inactive'],
    default: 'new',
  },

  // Model Type
  model: {
    type: String,
    default: 'ACCOUNT',
  },
});

AccountSchema.plugin(mongooseFuzzySearching, { fields: ['name'] });

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
