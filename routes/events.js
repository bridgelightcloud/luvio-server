const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.post('/', ctrl.events.create);
router.get('/', ctrl.events.index);
router.get('/:id', ctrl.events.show);
router.put('/:id', ctrl.events.update);
router.delete('/:id', ctrl.events.cancel);

module.exports = router;
