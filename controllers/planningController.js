
class PlanningController {

    constructor(taskModel, projectModel, planningModel) {
        this.Task = taskModel;
        this.Project = projectModel;
        this.Planning = planningModel;
        console.log("Planning controller", taskModel, projectModel, planningModel);
      }

    /**
     * List planning for a task
     * @param {*} taskId
     */
    async getDetails(taskId){
        const planning = await this.Planning.findAll({ where: { taskId: taskId },
                                                     order: ["startDate"]});
        return planning
    }
   /**
   * Save task step in planning
   * @param 
   */
  async save(data) {
    let {taskId, name, startDate, duration} = data;
    this.Planning.create(
      { taskId: taskId, name: name, startDate: startDate, duration: duration }
    );
    return taskId;
  }

}

module.exports = PlanningController;