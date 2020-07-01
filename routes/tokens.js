const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.get('/', ctrl.tokens.redirect);
router.post('/', ctrl.tokens.sendMagicLink);

module.exports = router;
