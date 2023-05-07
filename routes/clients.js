module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const clientController = require("../controllers/clientController.js");

    router.get('/', (req, res) => {
        res.redirect('/client/year');
    });
    router.get('/year/', clientController.RouteByYear);
    router.get('/:id', clientController.RouteById);

    function checkSignIn(req, res, next){
        if(req.session.token){
           next();     //If session exists, proceed to page
        } else {
          // Trying to access unauthorized page, redirect to login
          res.redirect('/user/login');
        }
     }
  
      app.use('/client', checkSignIn, router);
 
};
