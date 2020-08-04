const { Todo } = require('../models');

class TodosController {
  static async create(req, res) {
    try {
      const { title, description, due_date } = req.body;
      const todo = await Todo.create({
        title,
        description,
        due_date,
        UserId: req.userData.id,
      });
      res.status(201).json({ todo });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async findAll(req, res) {
    try {
      const todo = await Todo.findAll({
        where: {
          UserId: req.userData.id,
        },
      });
      res.status(200).json({ todo });
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, due_date } = req.body;
      const todo = await Todo.update(
        {
          title,
          description,
          due_date,
        },
        { where: { id }, returning: true }
      );
      res.status(200).json({ todo: todo[1][0] });
    } catch (err) {
      next(err);
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      await Todo.destroy({ where: { id } });
      res.status(200).json({ msg: `'data has been deleted` });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TodosController;
