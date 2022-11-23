const express = require("express");
const router = express.Router();

// Les routes par page
const clientsRoute = require("./clients");
const projectRoute = require("./project");
const contactRoute = require("./contact");

module.exports = (params) => {

//  router.use("/", clientsRoute(params));
  router.use("/client", clientsRoute(params));
  router.use("/project", projectRoute(params));
  router.use("/contact", contactRoute(params));

  router.use('/planning', (requete, reponse) => {
    reponse.status(404).send('Route inexistante');
});
  return router;
};
