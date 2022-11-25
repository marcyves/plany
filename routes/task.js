const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController, taskController } = params;

    router.get('/', async (request, response) => {
        const cmd = request.query.cmd;
        const id = request.query.taskId;

        console.log(`Commande: ${cmd}`);

        switch(cmd){
            case "details":
                return response.render('layout', { pageTitle: 'Task Details', template: 'index' });
                break;
            case "edit":
                return response.render('layout', { pageTitle: 'Task Modification', template: 'index' });
                break;
            case "delete":
                return response.render('layout', { pageTitle: 'Task Delete', template: 'index' });
                break;
            default:
                return response.render('layout', { pageTitle: 'Task', template: '404' });
                break;
        }
    });

   return router;
};
  