const express = require("express");
const router = express.Router();

const clients = require("./clients");
const planning = require("./planning");
const task = require("./task");
const projectRoute = require("./project");
const userRoute = require("./user");

const myLib = require("../config/myLib");

module.exports = (params) => {

  router.get("/", (req, res) => {
    res.redirect("/client/year");
  });

  router.get("/logout", function (req, res) {
    req.session.destroy(function () {
      console.log("user logged out.");
    });
    res.redirect("/user/login");
  });

  router.use("/client", myLib.checkSignIn, clients(params.db));
  router.use("/planning", myLib.checkSignIn, planning(params.db));
  router.use("/task", myLib.checkSignIn, task(params.db));
  router.use("/user", userRoute(params));
  router.use("/project", myLib.checkSignIn, projectRoute(params));

  router.use("/", (requete, reponse) => {
    reponse.render("layout", {
      pageTitle: "Cette page n'existe pas",
      template: "404",
    });
  });

  return router;
};
