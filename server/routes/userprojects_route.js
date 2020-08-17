const express = require('express');
const router = express.Router();

const UserProjectsController = require('../controllers/userProjects_controller');

router.get('/', UserProjectsController.findOne);
router.get('/:id', UserProjectsController.findAllEmail);
router.post('/', UserProjectsController.create);

module.exports = router;
