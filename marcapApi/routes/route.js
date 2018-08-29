const express = require('express');
const router = express.Router();

const incident_controller = require('../controllers/insidencias.controller');

router.post('/', incident_controller.create);

router.get('/', incident_controller.detailAll);

router.get('/:id/detail', incident_controller.detail);

router.put('/:id/update', incident_controller.update);

router.delete('/:id/delete', incident_controller.delete);

module.exports = router;