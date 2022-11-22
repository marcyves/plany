/**
 *
 */
class ProjectController {
    constructor(projectModel) {
        this.Project = projectModel;
      }

  /**
   * Get project details provided its id
   * @param {*} id
   */
  async getProject(id) {
    const projects = this.Project.findOne({ where: { projectId: id } });
    return projects;
  }

  /**
   * Get All projects information from Client provided their id
   * @param {*} id
   */
  async getProjectsForClient(id) {
    const projects = this.Project.findAll({ where: { clientId: id } });
    return projects;
  }
}

module.exports = ProjectController;
