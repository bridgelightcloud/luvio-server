/* eslint-disable no-console */
const mongoose = require('mongoose');
require('dotenv').config();

console.log('Connecting to', process.env.MONGODB_URL);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));

module.exports = {
  Account: require('./Account'),
};
