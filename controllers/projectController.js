/**
 *
 */
class ProjectController {
    constructor(projectModel) {
        this.Project = projectModel;
      }

  /**
   * Get all project details 
   */
   async getProjects() {
    const projects = this.Project.findAll({ order:["year", "clientId"], include: this.Client });
    return projects;
  }

    /**
   * Get all project details 
   */
     async getProjectsByYear(year) {
      const projects = this.Project.findAll({ order:["clientId"], include: this.Client, where: { year: year} });
      return projects;
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
