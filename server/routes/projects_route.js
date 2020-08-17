const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/projects_controller');
const { authZ_project } = require('../middlewares/authorization');

router.post('/', ProjectsController.create);
router.get('/', ProjectsController.findAll);

router.get('/:id', authZ_project, ProjectsController.findOne);
router.put('/:id', authZ_project, ProjectsController.update);
router.delete('/:id', authZ_project, ProjectsController.destroy);

module.exports = router;
