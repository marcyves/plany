module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const taskController = require("../controllers/taskController.js");
  const projectController = require("../controllers/projectController");

  router.get("/", projectController.routeList);
  router.get("/:id([0-9]+)", projectController.routeDetails);
  
  return router;
};
