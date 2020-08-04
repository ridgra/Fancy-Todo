const express = require('express');
const router = express.Router();
const TodosController = require('../controllers/todos_controller');
const { authentication } = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

router.use(authentication);

router.post('/', TodosController.create);
router.get('/', TodosController.findAll);
router.put('/:id', authorization, TodosController.update);
router.delete('/:id', authorization, TodosController.destroy);

module.exports = router;
