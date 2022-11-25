const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController, taskController } = params;

    router.get('/', async (request, response) => {
        const projects = await projectController.getProjects();
        return response.render('layout', { pageTitle: 'My Projects', template: 'projects_all', projects });
    });

    router.get('/:id', async (request, response) => {
        const project = await projectController.getProject(request.params.id);
        const tasks = await taskController.getTasksForProject(request.params.id);
        return response.render('layout', { pageTitle: 'Project Details', template: 'project_details', project, tasks });
    });

   return router;
};
  