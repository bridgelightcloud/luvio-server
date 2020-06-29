// Import Externals
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

// Config
const PORT = process.env.PORT || 8080;
const app = express();
const routes = require('./routes');

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

// Morgan Logging
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Good');
});

app.use('/api/v1/accounts', routes.accounts);

const server = app.listen(PORT);
// The signals we want to handle
// NOTE: although it is tempting, the SIGKILL signal (9) cannot be intercepted and handled
const signals = {
  SIGHUP: 1,
  SIGINT: 2,
  SIGTERM: 15,
};

// Do any necessary shutdown logic for our application here
const shutdown = (signal, value) => {
  console.log('shutting down!');
  server.close(() => {
    console.log(`server stopped by ${signal} with value ${value}`);
    process.exit(128 + value);
  });
};

// Create a listener for each of the signals that we want to handle
Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    console.log(`process received a ${signal} signal`);
    shutdown(signal, signals[signal]);
  });
});
