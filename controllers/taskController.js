/**
 *
 */
class TaskController {
    constructor(db) {
        this.db = db;
    }

  /**
   * Get all project details 
   */
   async getTasks() {
    const tasks = this.db.task.findAll();
    return tasks;
  }

  /**
   * Get task details provided its id
   * @param {*} id
   */
  async getTask(id) {
    const task = await this.db.task.findOne({ where: { taskId: id } });
    return task;
  }

  /**
   * Get task details provided its id
   * @param {*} id
   */
     async getFullTask(id) {
      const task = await this.db.task.findOne({ where: { taskId: id }, include: this.Project });
      const project = await task.getProject();
        return {task, project};
    }
  
  /**
   * Get All tasks information from Client provided their id
   * @param {*} id
   */
  async getTasksForProject(id) {
    const tasks = this.db.task.findAll({ where: { projectId: id } });
    return tasks;
  }

}

module.exports = TaskController;
