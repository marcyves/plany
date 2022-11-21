const express = require('express');
const router = express.Router();

// Les routes par page
const clientsRoute = require('./clients');
const contactRoute = require('./contact');

module.exports = params => {
    
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Project Planner', template: 'index' });
  });

  router.use('/clients', clientsRoute(params));
  router.use('/contact', contactRoute(params));

  return router;
};
  