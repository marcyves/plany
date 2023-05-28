const db = require("../models");
const Task = db.task;
const Project = db.project;

const planningController = require("../controllers/planningController.js");


/**
   * Get all project details 
   */
   exports.getTasks = async () => {
    const tasks = Task.findAll();
    return tasks;
  }

  /**
   * Get task details provided its id
   * @param {*} id
   */
  exports.getTask = async (id) => {
    const task = await Task.findOne({ where: { taskId: id } });
    return task;
  }

  /**
   * Get task details provided its id
   * @param {*} id
   */
     exports.getFullTask = async (id) => {
      const task = await Task.findOne({ where: { taskId: id }, include: Project });
      const project = await task.getProject();
        return {task, project};
    }
  
  /**
   * Get All tasks information from Client provided their id
   * @param {*} id
   */
  exports.getTasksForProject = async (id) => {
    const tasks = Task.findAll({ where: { projectId: id } });
    return tasks;
  }

exports.routeDetails = async (request, response) => {

  const { task, project } = await this.getFullTask(request.params.id);
  const planning = await planningController.getDetails(request.params.id);

  return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project, planning });
};

exports.routeDelete = async (request, response) => {
  return response.render('layout', { pageTitle: 'Task Delete', template: 'task_delete' });
};

exports.routePlan =  async (request, response) => {

  const id = await planningController.save(request.body);
  const { task, project } = await this.getFullTask(id);
  const planning = await planningController.getDetails(id);

  return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project, planning });
};

exports.routePlanById = async (request, response) => {

  const { task, project } = await this.getFullTask(request.params.id);
  return response.render('layout', { pageTitle: 'Task Creation', template: 'task_create', task, project });
};
