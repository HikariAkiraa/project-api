const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

router.get('/getAll', storeController.getAll);
router.post('/create', storeController.create);
router.get('/:id', storeController.getById);
router.put('/', storeController.update);
router.delete('/:id', storeController.remove);

module.exports = router;
