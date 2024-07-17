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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webServersModel = void 0;
//From this file the functions communicate with the web_servers table from the DB
const knex_1 = __importDefault(require("../db/knex"));
const createServer = (name, url) => __awaiter(void 0, void 0, void 0, function* () {
    const [server] = yield (0, knex_1.default)('web_servers')
        .insert({ name, url })
        .returning('*');
    return server;
});
const getAllServers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('web_servers').select('id', 'name', 'status');
});
const getServerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('web_servers').where({ id }).first();
});
const updateServer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('web_servers').where({ id }).update(data);
});
const deleteServer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('web_servers').where({ id }).del();
});
exports.webServersModel = {
    createServer,
    getAllServers,
    getServerById,
    updateServer,
    deleteServer,
};
