const mongoose = require('mongoose');

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

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
