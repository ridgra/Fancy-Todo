const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/projects_controller');


router.post('/', ProjectsController.create);
router.get('/', ProjectsController.findAll);
router.get('/:id', ProjectsController.findOne);
router.put('/:id', ProjectsController.update);
router.delete('/:id', ProjectsController.destroy);

module.exports = router;
