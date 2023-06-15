const db = require("../models");
const Project = db.project;
const ClientModel = db.client;

const taskController = require("../controllers/taskController.js");
const clientController = require("../controllers/clientController.js");

/**
 * Get all project details
 */
exports.getProjects = async () => {
  const projects = Project.findAll({
    order: ["year", "clientId"],
    include: Client,
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

exports.routeAdd = async (request, response) => {
  const clientId = request.params.id;
  const projects = await this.getProjectsForClient(clientId);

  return response.render("layout", {
    pageTitle: "Register New Project",
    template: "project_add",
    projects,
    clientId,
  });
};

exports.routeCopy = async (request, response) => {
  // Get actual project details
  const projectId = request.params.id;
  var project = await this.getProject(projectId);
  // Get Client for this project
  var Client = await clientController.getClient(project.clientId);
  // Link Client to user if necessary
  var clientId = project.clientId;
  if (Client.userId !== request.session.user_id) {
    await ClientModel.create({
      name: Client.name,
      defaultRate: Client.defaultRate,
      userId: request.session.user_id,
    }).then((client) => {
      if (client) {
        console.log(client);
        clientId = client.clientId;
      } else {
        const message = "Erreur creation Client";
        console.log(message);
        reponse.render("layout", {
          pageTitle: "Client Creation Error",
          template: "Erreur",
          message
        });
      }
    });

    // Duplicate project for current year
    const now = new Date();
    const year = parseInt(now.getFullYear());
    await Project.create({
      name: project.name,
      budget: project.budget,
      timeAllocated: project.timeAllocated,
      realRate: project.realRate,
      period: project.period,
      year: year,
      startDate: null,
      clientId: clientId,
    }).then((project) => {
      if (project) {
        console.log(project);
      } else {
        const message = "Erreur creation projet";
        console.log(message);
        reponse.render("layout", {
          pageTitle: "Project Creation Error",
          template: "Erreur",
          message
        });

      }
    });
  }

  // Back to home page
  return response.redirect("/");
};

exports.routeCreate = async (request, response) => {
  const clientId = request.params.id;

  return response.render("layout", {
    pageTitle: "My Projects",
    template: "project_create",
    clientId,
  });
};
