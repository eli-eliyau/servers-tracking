"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverController = void 0;
const webServersModel_1 = require("../models/webServersModel");
const requestsModel_1 = require("../models/requestsModel");
const createServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, url } = req.body;
    try {
        const newServer = yield webServersModel_1.webServersModel.createServer(name, url);
        newServer
            ? res.status(201).json({ message: 'Server created successfully' })
            : res.status(400).json({ message: 'Invalid request data' });
    }
    catch (error) {
        console.error('Error creating server:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const getAllServers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servers = yield webServersModel_1.webServersModel.getAllServers();
        servers.length > 0
            ? res.status(200).json(servers)
            : res.status(404).json({ message: 'No servers found' });
    }
    catch (error) {
        console.error('Error getting all servers:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const getServerRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const requests = yield requestsModel_1.requestsModel.getAllRequests(id);
        requests.length > 0
            ? res.status(200).json(requests)
            : res.status(404).json({ message: 'No requests found for this server' });
    }
    catch (error) {
        console.error('Error getting server requests:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const updateServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, url } = req.body;
    try {
        const updatedCount = yield webServersModel_1.webServersModel.updateServer(id, { name, url });
        updatedCount > 0
            ? res.status(200).json({ message: 'Server updated successfully' })
            : res.status(404).json({ message: 'Server not found' });
    }
    catch (error) {
        console.error('Error updating server:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const deleteServer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const delCount = yield webServersModel_1.webServersModel.deleteServer(id);
        delCount > 0
            ? res.status(200).json({ message: 'Server deleted successfully' })
            : res.status(404).json({ message: 'Server not found or not deleted' });
    }
    catch (error) {
        console.error('Error deleting server:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const getServerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const server = yield webServersModel_1.webServersModel.getServerById(id);
        const requests = yield requestsModel_1.requestsModel.getLast10Requests(id);
        server
            ? res.status(200).json({ server, requests })
            : res.status(404).json({ message: 'Server not found' });
    }
    catch (error) {
        console.error('Error getting server by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.serverController = {
    createServer,
    getServerRequests,
    updateServer,
    deleteServer,
    getServerById,
    getAllServers
};
