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

app.use('/api/v1/accounts', routes.accounts);
app.use('/api/v1/sessions', routes.sessions);
app.use('/home/magic-link', routes.tokens);

const server = app.listen(PORT);

util.Signal(server);
