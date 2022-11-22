const express = require("express");
const router = express.Router();

// Les routes par page
const clientsRoute = require("./clients");
const contactRoute = require("./contact");

module.exports = (params) => {
  router.use("/", clientsRoute(params));

  router.use("/client", clientsRoute(params));
  router.use("/contact", contactRoute(params));

  return router;
};
