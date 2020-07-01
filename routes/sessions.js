const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.post('/', ctrl.sessions.create);
router.get('/:id', ctrl.sessions.validate);
router.delete('/:id', ctrl.sessions.remove);

module.exports = router;
