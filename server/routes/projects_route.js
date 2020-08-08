const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/projects_controller');
const { authentication } = require('../middlewares/authentication');
// const authorization = require('../middlewares/authorization');

router.use(authentication);

router.post('/', ProjectsController.create);
router.get('/', ProjectsController.findAll);
router.put('/:id', ProjectsController.update);
router.delete('/:id', ProjectsController.destroy);

module.exports = router;
