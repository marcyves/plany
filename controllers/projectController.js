/**
 *
 */
class ProjectController {
    constructor(db) {
        this.db = db;
      }

  /**
   * Get all project details 
   */
   async getProjects() {
    const projects = this.db.project.findAll({ order:["year", "clientId"], include: this.Client });
    return projects;
  }

    /**
   * Get all project details 
   */
     async getProjectsByYear(year) {
      const projects = this.db.project.findAll({ order:["clientId"], include: this.Client, where: { year: year} });
      return projects;
    }
  
  
   /**
   * Get project details provided its id
   * @param {*} id
   */
  async getProject(id) {
    const projects = this.db.project.findOne({ where: { projectId: id } });
    return projects;
  }

  /**
   * Get All projects information from Client provided their id
   * @param {*} id
   */
  async getProjectsForClient(id) {
    const projects = this.db.project.findAll({ where: { clientId: id } });
    return projects;
  }
}

module.exports = ProjectController;
