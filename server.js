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
  res.send('Good');
});

app.use('/api/v1/accounts', routes.accounts);
app.use('/api/v1/sessions', routes.sessions);

const server = app.listen(PORT);

util.Signal(server);
