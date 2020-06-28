const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
