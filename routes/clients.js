const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController } = params;

    router.get('/', async (request, response) => {
        const clients = await clientController.getFullDetails();
        return response.render('layout', { pageTitle: 'My Clients', template: 'clients_full', clients });
    });

    router.get('/:id', async (request, response) => {
        console.log("Routeur client id")
        const client_details = await clientController.getClient(request.params.id);
        if (client_details){
            const projects = await projectController.getProjectsForClient(request.params.id);
            return response.render('layout', { pageTitle: 'Client Details', template: 'client_details', client_details, projects });    
        } else {
            return response.render('layout', { pageTitle: 'Lost', template: '404' });
        }

    });

   return router;
};
  