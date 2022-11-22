const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController, taskController } = params;

/*     router.get('/', async (request, response) => {
        const clients = await clientController.getNames();
        return response.render('layout', { pageTitle: 'My Clients', template: 'clients', clients });
    });
 */
    router.get('/:id', async (request, response) => {
        const project = await projectController.getProject(request.params.id);
        const tasks = await taskController.getTasksForProject(request.params.id);
        return response.render('layout', { pageTitle: 'Project Details', template: 'project_details', project, tasks });
    });

   return router;
};
  