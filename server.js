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

// Body Parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

// Morgan Logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Good');
});

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
