
class PlanningController {

    constructor(Op, db) {
/*       this.Task = taskModel;
      this.Project = projectModel;
      this.Planning = planningModel;
 */      
      this.Op = Op;
      this.db = db;
      }

    /**
     * List planning for a task
     * @param {*} taskId
     */
    async getDetails(taskId){
        const planning = await this.db.planning.findAll({ where: { taskId: taskId },
                                                     order: ["startDate"]});
        return planning
    }

    /**
     * List planning for a month
     * @param {*} month
     */
    async getMonth(begin, end){

      var condition = {
        where: 
        { 
          startDate: {
            [this.Op.between]:  [begin, end]
          }
        }, order: ["startDate"]
      };

      const planning = await this.db.planning.findAll(condition);

      return planning
    }
    /**
     * Detailed planning for a month
     * @param {*} month
     */
        async getMonthDetails(begin, end){

          const [planning, metadata] = await this.db.sequelize.query(
            "SELECT P.*, T.name AS TaskName, X.name AS ProjectName FROM Tasks T, Plannings P, Projects X "+
            "WHERE T.taskId = P.taskId AND T.projectID = X.projectId"+
            " AND P.startDate BETWEEN '" + begin + "' AND '" + end + "';"
          );

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