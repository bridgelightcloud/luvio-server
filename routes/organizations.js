const express = require('express');
const ctrl = require('../controllers');

const router = express.Router();

router.post('/', ctrl.organizations.create);
router.get('/', ctrl.organizations.index);
router.get('/:id', ctrl.organizations.show);
router.put('/:id', ctrl.organizations.update);
router.delete('/:id', ctrl.organizations.deactivate);

module.exports = router;
