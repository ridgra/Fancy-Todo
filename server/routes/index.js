const express = require('express');
const router = express.Router();

const usersProjects = require('./userprojects_route');
const users = require('./users_route');
const projects = require('./projects_route');
const todos = require('./todos_route');
const { authentication } = require('../middlewares/authentication');
;
const CalendarificControllers = require('../controllers/calendarific_controller');

router.use('/users', users);

router.use(authentication);

router.use('/projects', projects);
router.use('/todo', todos);
router.use('/user-projects', usersProjects);
router.post('/calendarific', CalendarificControllers.getEvent);

module.exports = router;
