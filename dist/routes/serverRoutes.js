"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//This file has routes that belong to calling the servers processes
const express_1 = require("express");
const serverController_1 = require("../controllers/serverController");
const serverRouter = (0, express_1.Router)();
serverRouter.delete('/:id', serverController_1.serverController.deleteServer)
    .post('/create', serverController_1.serverController.createServer)
    .put('/update/:id', serverController_1.serverController.updateServer)
    .get('/by-id/:id', serverController_1.serverController.getServerById)
    .get('/get-all', serverController_1.serverController.getAllServers)
    .get('/requests/:id', serverController_1.serverController.getServerRequests);
exports.default = serverRouter;
