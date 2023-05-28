module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const taskController = require("../controllers/taskController.js");

  router.get("/:id", taskController.routeDetails);
  router.get("/delete/:id", taskController.routeDelete);
  router.post("/plan/", taskController.routePlan);
  router.get("/plan/:id", taskController.routePlanById);

  /* TODO 
            case "details":
                return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project });
            case "edit":
                return response.render('layout', { pageTitle: 'Task Modification', template: 'task_edit', task, project });
         */

  function checkSignIn(req, res, next) {
    if (req.session.token) {
      next(); //If session exists, proceed to page
    } else {
      // Trying to access unauthorized page, redirect to login
      res.redirect("/user/login");
    }
  }

  app.use("/task", checkSignIn, router);

};