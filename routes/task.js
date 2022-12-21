const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController, taskController } = params;

    router.get('/:id', async (request, response) => {
        const { task, project } = await taskController.getFullTask(request.params.id);
        return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project });
    });

    router.get('/delete/:id', async (request, response) => {
        return response.render('layout', { pageTitle: 'Task Delete', template: 'task_delete' });
    });

    router.get('/plan/:id/:step', async (request, response) => {
        const step = request.params.step;

        const { task, project } = await taskController.getFullTask(request.params.id);
        return response.render('layout', { pageTitle: 'Task Creation', template: 'task_create', task, project });
    });

        /* TODO 
            case "details":
                return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project });
            case "edit":
                return response.render('layout', { pageTitle: 'Task Modification', template: 'task_edit', task, project });
         */

   return router;
};
  