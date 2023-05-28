const express = require("express");
const router = express.Router();

const userRoute = require("./user");
const projectRoute = require("./project");

module.exports = (params) => {

  function checkSignIn(req, res, next){
    if(req.session.token){
       next();     //If session exists, proceed to page
    } else {
      // Trying to access unauthorized page, redirect to login
      res.redirect('/user/login');
    }
 }

  router.get('/', (req, res) => {
    res.redirect('/client/year');
  });

  router.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/user/login');
 });

  router.use("/user", userRoute(params));
  router.use("/project", checkSignIn, projectRoute(params));

  router.use('/', (requete, reponse) => {
    reponse.render('layout', { pageTitle: "Cette page n'existe pas", template: 'erreur'});
  });

  return router;
};
