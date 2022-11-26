const express = require("express");
const router = express.Router();

const userRoute = require("./user");
// Les routes par page
const clientsRoute = require("./clients");
const projectRoute = require("./project");
const taskRoute = require("./task");
const contactRoute = require("./contact");

module.exports = (params) => {

  router.get('/', (req, res) => {
    res.redirect('/client');
  })
  router.use("/user", userRoute(params));
  router.use("/client", clientsRoute(params));
  router.use("/project", projectRoute(params));
  router.use("/task", taskRoute(params));
  router.use("/contact", contactRoute(params));

  router.use('/planning', (requete, reponse) => {
    reponse.status(404).send('Route inexistante');
});
  return router;
};
