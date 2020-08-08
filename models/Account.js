const mongoose = require('mongoose');
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  screenName: String,
  state: {
    type: String,
    enum: ['new', 'active', 'inactive'],
    default: 'new',
  },
});

AccountSchema.plugin(mongooseFuzzySearching, { fields: ['screenName'] });

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
