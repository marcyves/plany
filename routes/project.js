module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const taskController = require("../controllers/taskController.js");
  const projectController = require("../controllers/projectController");

  router.get("/", projectController.routeList);

  router.get("/:id([0-9]+)", async (request, response) => {
    const project = await projectController.getProject(request.params.id);
    const tasks = await taskController.getTasksForProject(request.params.id);
    return response.render("layout", {
      pageTitle: "Project Details",
      template: "project_details",
      project,
      tasks,
    });
  });

  return router;
};
