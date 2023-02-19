const express = require('express');
const router = express.Router();


module.exports = params => {
    const { planningController, taskController } = params;

    router.use('/', async (request, response) => {

        const today = new Date();
        const currentMonth = ('00'+ (today.getMonth() + 1)).slice(-2);
        const currentYear = today.getFullYear();
        const month = `${currentYear}-${currentMonth}-01T00:00:00.000Z`;
        console.log("Router Planning month", month);
        console.log("Router Planning today", today);

        const planning = await planningController.getMonth(month);
        return response.render('layout', { pageTitle: 'Planning', template: 'Planning', planning });
    });
    

   return router;
};
  