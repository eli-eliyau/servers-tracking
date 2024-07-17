//This file has routes that belong to calling the servers processes
import { Router } from 'express';
import {serverController} from '../controllers/serverController';

const serverRouter = Router();

serverRouter.delete('/:id', serverController.deleteServer)
    .post('/create', serverController.createServer)
    .put('/update/:id', serverController.updateServer)
    .get('/by-id/:id', serverController.getServerById)
    .get('/get-all', serverController.getAllServers)
    .get('/requests/:id', serverController.getServerRequests);


export default serverRouter;
