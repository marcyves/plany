const express = require('express');
const router = express.Router();


module.exports = params => {
    const { db, clientController, projectController, taskController } = params;

    router.get('/', async (request, response) => {
        let cmd = request.query.cmd;
        const id = request.query.taskId;
        console.log(id);
        if (!id){
            return response.redirect('/project');
        }
        const { task, project } = await taskController.getFullTask(id);

        switch(cmd){
            case "details":
                return response.render('layout', { pageTitle: 'Task Details', template: 'task_details', task, project });
                break;
            case "edit":
                return response.render('layout', { pageTitle: 'Task Modification', template: 'task_edit', task, project });
                break;
            case "delete":
                return response.render('layout', { pageTitle: 'Task Delete', template: 'index' });
                break;
            default:
                return response.redirect('/');
                break;
        }
    });

   return router;
};
  