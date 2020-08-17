const { Project, UserProject, Todo, User } = require('../models');

async function authZ_project(req, res, next) {
  try {
    const projectId = req.params.id || req.body.projectId;
    const userId = req.userData.id;
    const project = await Project.findByPk(projectId);
    if (!project) throw { msg: 'Project is not exists' };
    const userProject = await UserProject.findAll({
      where: {
        projectId,
      },
    });
    const checkUser = userProject.find((e) => e.userId == userId);
    if (!checkUser) throw { msg: 'Authorization failed' };
    next();
  } catch (err) {
    next(err);
  }
}

async function authZ_todo(req, res, next) {
  try {
    const id = req.params.id;
    const userId = req.userData.id;
    const todo = await Todo.findByPk(id);
    if (!todo) throw { msg: 'Todo is not exists' };
    const userProject = await UserProject.findAll({
      where: {
        projectId: todo.projectId,
      },
    });
    const checkUser = userProject.find((e) => e.userId == userId);
    if (!checkUser) throw { msg: 'Authorization failed' };
    next();
  } catch (err) {
    next(err);
  }
}

async function authZ_userProject(req, res, next) {
  try {
    const projectId = req.query.projectId || req.body.projectId;
    const userId = req.query.userId || req.body.userId;
    const userId_session = req.userData.id;
    
    const project = await Project.findByPk(projectId);
    if (!project) throw { msg: 'Project is not exists' };
    const userProject = await UserProject.findAll({
      where: {
        projectId,
      },
    });

    const user = await User.findByPk(userId)
    if (!user) throw { msg: 'User is not exists' };

    const exists = userProject.find((e) => e.userId == userId);
    if (exists) throw { msg: 'User already exists' };
    
    
    const checkUser = userProject.find((e) => e.userId == userId_session);
    if (!checkUser) throw { msg: 'Authorization failed' };
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { authZ_project, authZ_todo, authZ_userProject };
