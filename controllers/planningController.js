
class PlanningController {

    constructor(taskModel, planningModel, Op) {
        this.Task = taskModel;
        this.Planning = planningModel;
        this.Op = Op;
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
     * List planning for a month
     * @param {*} month
     */
    async getMonth(month){
//      const planning = await this.Planning.findAll({ where: { startDate: {[this.Op.gte]:  month} },
//        order: ["startDate"]});
      const planning = await this.Planning.findAll({where: { startDate: {[this.Op.gte]:  month}}, order: ["startDate"]});

      console.log(planning);
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