const { Todo } = require('../models');

class TodosController {
  static async create(req, res) {
    try {
      const { title, description, due_date } = req.body;
      await Todo.create({
        title,
        description,
        due_date,
      });
      res.status(201).json({ msg: `'${title}' has been inserted` });
    } catch (err) {
      const msg = err.errors[0].message || err;
      res.status(500).json({ error: msg || 'internal server error' });
    }
  }

  static async findAll(req, res) {
    try {
      const todo = await Todo.findAll();
      res.status(200).json({ data: todo });
    } catch (err) {
      const msg = err;
      res.status(500).json({ error: msg || 'internal server error' });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { title, description, due_date } = req.body;
      const findId = await Todo.findByPk(id);
      if (!findId) throw 'ID is not valid';
      await Todo.update(
        {
          title,
          description,
          due_date,
        },
        { where: { id } }
      );
      res.status(202).json({ msg: `'${findId.title}' has been updated` });
    } catch (err) {
      const msg = err.errors[0].message || err;
      res.status(500).json({ error: msg || 'internal server error' });
    }
  }

  static async destroy(req, res) {
    try {
      const { id } = req.params;
      const findId = await Todo.findByPk(id);
      if (!findId) throw 'ID is not valid';
      await Todo.destroy({ where: { id } });
      res.status(202).json({ msg: `'${findId.title}' has been deleted` });
    } catch (err) {
      const msg = err;
      res.status(500).json({ error: msg || 'internal server error' });
    }
  }
}

module.exports = TodosController;
