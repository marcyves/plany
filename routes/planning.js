const express = require('express');
const router = express.Router();


module.exports = params => {
    const { planningController, taskController } = params;

    router.use('/', async (request, response) => {

        const today = new Date();
        const currentYear = today.getFullYear();

        const currentMonth = ('00'+ (today.getMonth() + 1)).slice(-2);
        const beginMonth = `${currentYear}-${currentMonth}-01T00:00:00.000Z`;

        const nextMonth = ('00'+ (today.getMonth() + 2)).slice(-2);
        const endMonth = `${currentYear}-${nextMonth}-01T00:00:00.000Z`;

        const planning = await planningController.getMonth(beginMonth, endMonth);
        return response.render('layout', { pageTitle: 'Planning', template: 'Planning', planning });
    });
    

   return router;
};
  