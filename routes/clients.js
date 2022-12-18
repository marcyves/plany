const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController } = params;

    router.get('/', async (request, response) => {
        const years = [2021, 2022];
        const clients = await clientController.getClientDetailsByUser(response.locals.user_id);
        return response.render('layout', { pageTitle: 'My Clients', template: 'clients_full', clients, years });
    });

    router.get('/:id', async (request, response) => {

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
  