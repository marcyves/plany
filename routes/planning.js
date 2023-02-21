const express = require('express');
const router = express.Router();


module.exports = params => {
    const { planningController, eventController } = params;

    router.use('/', async (request, response) => {

        const today = new Date();
        const currentYear = today.getFullYear();

        const nowMth = today.getMonth();
        const currentMonth = ('00'+ (today.getMonth() + 1)).slice(-2);
        const beginMonth = `${currentYear}-${currentMonth}-01T00:00:00.000Z`;

        const nextMonth = ('00'+ (today.getMonth() + 2)).slice(-2);
        const endMonth = `${currentYear}-${nextMonth}-01T00:00:00.000Z`;

        const events = await planningController.getMonth(beginMonth, endMonth);

        let data = [];
        events.forEach(event => {
            const eventDate = new Date(event.startDate);
            if (eventDate.getMonth() == nowMth){
            const time = eventDate.getHours() + ":" + ('00'+ (eventDate.getMinutes())).slice(-2);
            data[eventDate.getDate()] = time + ": "+ event.name + " (" + event.duration +")";
            }
        });
            
        // (A2) MONTHS & DAY NAMES
        const months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        if(process.env.MONDAY == "true"){
            days.push(days.shift());
        }

        // (C1) DAYS IN MONTH + START/END DAYS
        // note - jan is 0 & dec is 11
        // note - sun is 0 & sat is 6
        let sMth = nowMth; // selected month
        let sYear = currentYear; // selected year
        let daysInMth = new Date(sYear, sMth+1, 0).getDate(), // number of days in selected month
            startDay = new Date(sYear, sMth, 1).getDay(), // first day of the month
            endDay = new Date(sYear, sMth, daysInMth).getDay(), // last day of the month
            now = new Date(), // current date
            // nowMth = now.getMonth(), // current month
            nowYear = parseInt(now.getFullYear()), // current year
            nowDay = sMth==nowMth && sYear==nowYear ? now.getDate() : null ;
                // (C3) DRAWING CALCULATIONS
        // (C3-1) BLANK SQUARES BEFORE START OF MONTH
        let squares = [];
        if (process.env.MONDAY == "true" && startDay != 1) {
        let blanks = startDay==0 ? 7 : startDay ;
        for (let i=1; i<blanks; i++) { squares.push("b"); }
        }
        if (!process.env.MONDAY == "true" && startDay != 0) {
        for (let i=0; i<startDay; i++) { squares.push("b"); }
        }

        // (C3-2) DAYS OF THE MONTH
        for (let i=1; i<=daysInMth; i++) { squares.push(i); }

        // (C3-3) BLANK SQUARES AFTER END OF MONTH
        if (process.env.MONDAY == "true" && endDay != 0) {
        let blanks = endDay==6 ? 1 : 7-endDay;
        for (let i=0; i<blanks; i++) { squares.push("b"); }
        }
        if (!process.env.MONDAY == "true" && endDay != 6) {
        let blanks = endDay==0 ? 6 : 6-endDay;
        for (let i=0; i<blanks; i++) { squares.push("b"); }
        }

        return response.render('layout', { pageTitle: 'Planning', template: 'Planning', today, months, days, nowMth, squares, data});
    });
    

   return router;
};
  