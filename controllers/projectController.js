const { client } = require("../models");

/**
 *
 */
class ProjectController {
    constructor(projectModel) {
        this.Project = projectModel;
      }
    
  /**
   * Get client information provided an id
   * @param {*} id
   */
  async getProjectsForClient(id) {
    const projects = this.Project.findAll({ where: { clientId: id } });
    return projects;
  }
}

module.exports = ProjectController;
