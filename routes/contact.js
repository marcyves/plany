const express = require('express');
const router = express.Router();
  
module.exports = () => {
    
    router.get('/', (request, response) => {
        response.render('layout', { pageTitle: 'Pour nous contacter', template: 'contact' });
    });

    router.post('/', (request, response) => {
        return response.send('Le formulaire de contact a été soumis');
    });

      return router;
};
  