const express = require('express');
const router = express.Router();

const users = require('./users_route');
const projects = require('./projects_route');
const todos = require('./todos_route');
router.use('/users', users);
router.use('/projects', projects);
router.use('/todo', todos);

module.exports = router;
