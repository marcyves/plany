const db = require("../models");
const Project = db.project;
const ProjectDetails = db.projectDetails;
const ClientModel = db.client;

const taskController = require("../controllers/taskController.js");
const clientController = require("../controllers/clientController.js");

const myLib = require("../config/myLib");

/**
 * Get all project details
 */
exports.getProjects = async () => {
  const projects = Project.findAll({
    order: ["clientId"],
    include: ClientModel,
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

  myLib.debug(1, "routeList");

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

  myLib.debug(1,`Add project "${project.name}" details to client`);

  // Get Client for this project
  var Client = await clientController.getClient(project.clientId);
  if (Client.userId !== request.session.user_id) {
    const message = "Project not in client portfolio Error";
    myLib.debug(1,message);
    response.render("layout", {
      pageTitle: message,
      template: "Erreur",
      message
    });
  }
  
  // Duplicate project details for current year
  const now = new Date();
  const year = parseInt(now.getFullYear());
  
  var projectDetails = await ProjectDetails.findOne({ where: { projectId: projectId } });
  if(projectDetails){
    myLib.debug(1,`project details found : ${projectDetails.projectDetailsId}`);

    await ProjectDetails.create({
      realRate: projectDetails.realRate,
      period: projectDetails.period,
      year: year,
      startDate: null,
      projectId: projectId,
    }).then((details) => {
      if (details) {
        console.log(`Nouveaux details pour le projet : ${details.projectDetailsId}`);
      } else {
        const message = "Erreur creation details projet";
        console.log(message);
        response.render("layout", {
          pageTitle: "Project Creation Error",
          template: "Erreur",
          message
        });

      }
    });
  }else{
    myLib.debug(1,`project details creation`);

    await ProjectDetails.create({
      realRate: 0,
      period: null,
      year: year,
      startDate: null,
      projectId: projectId,
    }).then((details) => {
      if (details) {
        console.log(`Nouveaux details pour le projet : ${details.projectDetailsId}`);
      } else {
        const message = "Erreur creation details projet";
        console.log(message);
        response.render("layout", {
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
