const express = require('express');
const router = express.Router();
const { authZ_userProject } = require('../middlewares/authorization');
const UserProjectsController = require('../controllers/userProjects_controller');

router.get('/', UserProjectsController.findOne);
router.get('/:id', UserProjectsController.findAllEmail);
router.post('/', authZ_userProject, UserProjectsController.create);

module.exports = router;
