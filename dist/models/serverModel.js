"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServer = exports.updateServer = exports.getLast10Requests = exports.getServerById = exports.getAllRequests = exports.getAllServers = exports.createServer = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const createServer = (name, url) => {
    return (0, knex_1.default)('web_servers').insert({ name, url });
};
exports.createServer = createServer;
const getAllServers = () => {
    return (0, knex_1.default)('web_servers').select('id', 'name', 'status');
};
exports.getAllServers = getAllServers;
const getAllRequests = (server_id) => {
    return (0, knex_1.default)('requests').where({ server_id }).orderBy('created_at', 'desc');
};
exports.getAllRequests = getAllRequests;
const getServerById = (id) => {
    return (0, knex_1.default)('web_servers').where({ id }).first();
};
exports.getServerById = getServerById;
const getLast10Requests = (server_id) => {
    return (0, knex_1.default)('requests').where({ server_id }).orderBy('created_at', 'desc').limit(10);
};
exports.getLast10Requests = getLast10Requests;
const updateServer = (id, name, url) => {
    return (0, knex_1.default)('web_servers').where({ id }).update({ name, url });
};
exports.updateServer = updateServer;
const deleteServer = (id) => {
    return (0, knex_1.default)('web_servers').where({ id }).del();
};
exports.deleteServer = deleteServer;
