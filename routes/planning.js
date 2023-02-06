const express = require('express');
const router = express.Router();


module.exports = params => {
    const { planningController, taskController } = params;

    router.use('/', (request, response) => {
        return response.render('layout', { pageTitle: 'Planning', template: 'Planning' });
    //    reponse.redirect('/client');
    });
    

   return router;
};
  