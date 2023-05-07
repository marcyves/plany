module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const planningController = require("../controllers/planningController.js");
    
    router.use('/',planningController.routePlanning);


function checkSignIn(req, res, next){
    if(req.session.token){
       next();     //If session exists, proceed to page
    } else {
      // Trying to access unauthorized page, redirect to login
      res.redirect('/user/login');
    }
 }

app.use('/planning', checkSignIn, router);
 
};
  