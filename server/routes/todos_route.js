const express = require('express');
const router = express.Router();

const TodosController = require('../controllers/todos_controller');

router.post('/', TodosController.create);
router.get('/', TodosController.findAll);
router.put('/:id', TodosController.update);
router.delete('/:id', TodosController.destroy);

module.exports = router;