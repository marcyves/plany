const express = require("express");
const router = express.Router();

const userRoute = require("./user");
const clientsRoute = require("./clients");
const projectRoute = require("./project");
const taskRoute = require("./task");

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
    res.redirect('/client');
  });

  router.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/user/login');
 });

  router.use("/user", userRoute(params));
  router.use("/client", checkSignIn, clientsRoute(params));
  router.use("/project", checkSignIn, projectRoute(params));
  router.use("/task", checkSignIn, taskRoute(params));

  router.use('/planning', (request, response) => {
    return response.render('layout', { pageTitle: 'Planning', template: 'Planning' });
//    reponse.redirect('/client');
});
  return router;
};
