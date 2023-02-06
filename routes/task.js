const express = require('express');
const router = express.Router();


module.exports = params => {
    const { planningController, taskController } = params;

    router.get('/:id', async (request, response) => {

        const { task, project } = await taskController.getFullTask(request.params.id);
        const planning = await planningController.getDetails(request.params.id);

        return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project, planning });
    });

    router.get('/delete/:id', async (request, response) => {
        return response.render('layout', { pageTitle: 'Task Delete', template: 'task_delete' });
    });

    router.post('/plan/', async (request, response) => {

        const id = await planningController.save(request.body);
        const { task, project } = await taskController.getFullTask(id);
        const planning = await planningController.getDetails(id);

        return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project, planning });

    });

    router.get('/plan/:id', async (request, response) => {
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
  