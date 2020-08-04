const { Todo } = require('../models');

async function authorization(req, res, next) {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) throw { msg: 'data is not found' };
    if (todo.UserId == req.userData.id) next();
    else throw { msg: 'authorization failed' };
  } catch (err) {
    next(err);
  }
}

module.exports = authorization;
