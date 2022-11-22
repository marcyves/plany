/**
 *
 */
class TaskController {
    constructor(taskModel) {
        this.Task = taskModel;
      }

  /**
   * Get task details provided its id
   * @param {*} id
   */
  async getTask(id) {
    const tasks = this.Task.findOne({ where: { taskId: id } });
    return tasks;
  }

  /**
   * Get All tasks information from Client provided their id
   * @param {*} id
   */
  async getTasksForProject(id) {
    console.log(`getTasksForProject ${id}`);
    const tasks = this.Task.findAll({ where: { projectId: id } });
    console.log(tasks);
    return tasks;
  }
}

module.exports = TaskController;
