const express = require('express');
const client = require('../models/client');
const router = express.Router();


module.exports = params => {
    const { db, clientController } = params;

    router.get('/', async (request, response) => {
        const clients = await clientController.getNames();    
        return response.render('layout', { pageTitle: 'My Clients', template: 'clients', clients });
    });

    router.get('/:id', async (request, response) => {
        const client = await clientController.getDisc(request.params.id);    
        return response.render('layout', { pageTitle: 'Client Details', template: 'client', client });
    });

   return router;
};
  