const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.post('/', ctrl.tokens.sendMagicLink);

module.exports = router;
