const db = require("../models");
const Project = db.project;

const taskController = require("../controllers/taskController.js");

/**
 * Get all project details
 */
exports.getProjects = async () => {
  const projects = Project.findAll({
    order: ["year", "clientId"],
    include: this.Client,
  });
  return projects;
};

/**
 * Get all project details
 */
exports.getProjectsByYear = async (year) => {
  const projects = Project.findAll({
    order: ["clientId"],
    include: this.Client,
    where: { year: year },
  });
  return projects;
};

/**
 * Get project details provided its id
 * @param {*} id
 */
exports.getProject = async (id) => {
  const projects = Project.findOne({ where: { projectId: id } });
  return projects;
};

/**
 * Get All projects information from Client provided their id
 * @param {*} id
 */
exports.getProjectsForClient = async (id) => {
  const projects = Project.findAll({ where: { clientId: id } });
  return projects;
};

exports.routeList = async (request, response) => {
  const projects = await this.getProjects();
  return response.render("layout", {
    pageTitle: "My Projects",
    template: "projects_all",
    projects,
  });
};

exports.routeDetails = async (request, response) => {
  const project = await this.getProject(request.params.id);
  const tasks = await taskController.getTasksForProject(request.params.id);
  return response.render("layout", {
    pageTitle: "Project Details",
    template: "project_details",
    project,
    tasks,
  });
};
