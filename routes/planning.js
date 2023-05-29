module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const planningController = require("../controllers/planningController.js");

  router.use("/", planningController.routePlanning);

  return router;
  
};
