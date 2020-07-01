const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.post('/', ctrl.accounts.create);
router.get('/', ctrl.accounts.index);
router.get('/lookup/:email', ctrl.accounts.lookup);
router.get('/:id', ctrl.accounts.show);
router.put('/:id', ctrl.accounts.update);
router.delete('/:id', ctrl.accounts.deactivate);

module.exports = router;
