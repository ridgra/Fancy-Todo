const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos_controller');
const { authZ_project, authZ_todo } = require('../middlewares/authorization');

router.post('/', authZ_project, TodosController.create);
router.get('/:id', authZ_project, TodosController.findAll);
router.get('/id/:id', authZ_todo, TodosController.findOne);
router.put('/status/:id', authZ_todo, TodosController.updateStatus);
router.put('/:id', authZ_todo, TodosController.update);
router.delete('/:id', authZ_todo, TodosController.destroy);

module.exports = router;
