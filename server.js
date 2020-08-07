// Import Externals
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();

// Config
const PORT = process.env.PORT || 8080;
const app = express();
const routes = require('./routes');
const util = require('./utilities');

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
  res.json({
    status: 'server up',
  });
});

// API Routes
app.use('/v1/accounts', routes.accounts);
app.use('/v1/events', routes.events);
app.use('/v1/organizations', routes.organizations);
app.use('/v1/sessions', routes.sessions);
app.use('/v1/tokens', routes.tokens);

const server = app.listen(PORT);

// Set signal listening for Docker
util.Signal(server);
