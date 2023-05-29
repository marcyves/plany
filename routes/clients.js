const myLib = require("../config/myLib");

module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const clientController = require("../controllers/clientController.js");

    router.get('/', (req, res) => {
        res.redirect('/client/year');
    });
    router.get('/year/', clientController.RouteByYear);
    router.get('/:id', clientController.RouteById);
  
    return router;
};
