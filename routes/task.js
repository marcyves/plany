module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const taskController = require("../controllers/taskController.js");

  router.get("/:id", taskController.routeDetails);
  router.get("/delete/:id", taskController.routeDelete);
  router.post("/plan/", taskController.routePlan);
  router.get("/plan/:id", taskController.routePlanById);

  return router;
};
