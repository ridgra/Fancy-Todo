const express = require('express');
const router = express.Router();

const todos = require('./todos_route');
const users = require('./users_route');
router.use('/todo', todos);
router.use('/users', users);

module.exports = router;
