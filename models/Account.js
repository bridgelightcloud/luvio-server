const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  picUrl: String,
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
