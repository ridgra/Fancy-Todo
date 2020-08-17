const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos_controller');
// const { authentication } = require('../middlewares/authentication');
// const authorization = require('../middlewares/authorization');

// router.use(authentication);

router.post('/', TodosController.create);
router.get('/:projectId', TodosController.findAll);
router.get('/id/:id', TodosController.findOne);
router.put('/status/:id', TodosController.updateStatus);
router.put('/:id', TodosController.update);
router.delete('/:id', TodosController.destroy);

module.exports = router;
