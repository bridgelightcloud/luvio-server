const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.post('/', ctrl.sessions.login);
router.get('/:id', ctrl.sessions.validate);
router.delete('/:id', ctrl.sessions.logout);

module.exports = router;
