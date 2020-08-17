const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users_controller');

router.post('/', UsersController.findOne)
router.post('/register', UsersController.register)
router.post('/login', UsersController.login)
router.post('/googleSignIn', UsersController.googleSignIn);

module.exports = router