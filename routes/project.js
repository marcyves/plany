module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const taskController = require("../controllers/taskController.js");
  const projectController = require("../controllers/projectController");

  router.get("/", projectController.routeList);
  router.get("/create/:id([0-9]+)", projectController.routeCreate);
  router.get("/add/:id([0-9]+)", projectController.routeAdd);
  router.get("/copy/:id([0-9]+)", projectController.routeCopy);
  router.get("/:id([0-9]+)", projectController.routeDetails);
  
  return router;
};
