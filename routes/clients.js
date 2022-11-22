const express = require('express');
const client = require('../models/client');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController } = params;

    router.get('/', async (request, response) => {
        const clients = await clientController.getNames();    
        return response.render('layout', { pageTitle: 'My Clients', template: 'clients', clients });
    });

    router.get('/:id', async (request, response) => {
        const client_details = await clientController.getClient(request.params.id);
        const projects = await projectController.getProjectsForClient(request.params.id);
        console.log(" == clientController.getClient");  
        console.log(client_details , projects);  
        return response.render('layout', { pageTitle: 'Client Details', template: 'client_details', client_details, projects });
    });

   return router;
};
  