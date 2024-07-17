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
exports.requestsModel = void 0;
//From this file the functions communicate with the requests table from the DB
const knex_1 = __importDefault(require("../db/knex"));
const createRequests = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const [server] = yield (0, knex_1.default)('requests')
        .insert(data)
        .returning('*');
    return server;
});
const getAllRequests = (server_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('requests').where({ server_id }).orderBy('created_at', 'desc');
});
const getLast10Requests = (server_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('requests').where({ server_id }).orderBy('created_at', 'desc').limit(10);
});
exports.requestsModel = {
    createRequests,
    getAllRequests,
    getLast10Requests
};
