const { Todo } = require('../models');

class TodosController {
  static async create(req, res) {
    try {
      const { title, description, due_date } = req.body;
      const todo = await Todo.create({
        title,
        description,
        due_date,
      });
      res.status(201).json(todo);
    } catch (err) {
      let msg = err.errors[0].message || 'internal server error';
      res.status(500).json({ error: msg });
    }
  }

  static async findAll(req, res) {
    try {
      const todo = await Todo.findAll();
      res.json(todo);
    } catch (err) {
      let msg = err.errors[0].message || 'internal server error';
      res.status(500).json({ error: msg });
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
        { where: { id } }
      );
      res.status(201).json(todo);
    } catch (err) {
      let msg = err.errors[0].message || 'internal server error';
      res.status(500).json({ error: msg });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const todo = await Todo.destroy({ where: { id } });
      res.json(todo);
    } catch (error) {
      let msg = err.errors[0].message || 'internal server error';
      res.status(500).json({ error: msg });
    }
  }
}

module.exports = TodosController;
