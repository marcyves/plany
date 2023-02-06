/**
 *
 */
class TaskController {
    constructor(taskModel, projectModel) {
        this.Task = taskModel;
        this.Project = projectModel;
      }

  /**
   * Get task details provided its id
   * @param {*} id
   */
  async getTask(id) {
    const task = await this.Task.findOne({ where: { taskId: id } });
    return task;
  }

  /**
   * Get task details provided its id
   * @param {*} id
   */
     async getFullTask(id) {
      const task = await this.Task.findOne({ where: { taskId: id }, include: this.Project });
      const project = await task.getProject();
        return {task, project};
    }
  
  /**
   * Get All tasks information from Client provided their id
   * @param {*} id
   */
  async getTasksForProject(id) {
    const tasks = this.Task.findAll({ where: { projectId: id } });
    return tasks;
  }

}

module.exports = TaskController;
