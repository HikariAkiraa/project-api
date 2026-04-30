const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:email', userController.getByEmail);
router.put('/', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
