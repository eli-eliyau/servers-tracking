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
exports.startMonitoring = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const requestUtils_1 = require("../utils/requestUtils");
const serverTesting_1 = require("./serverTesting");
const startMonitoring = () => __awaiter(void 0, void 0, void 0, function* () {
    let amountSuccess = [];
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const servers = yield (0, knex_1.default)('web_servers').select('*');
        servers.forEach((server) => __awaiter(void 0, void 0, void 0, function* () {
            for (let i = 0; i < 5; i++) {
                const response = yield (0, requestUtils_1.sendRequest)(server.url);
                const success = response.status >= 200 && response.status < 300 && response.time < 60000;
                amountSuccess.push(success);
                yield (0, knex_1.default)('requests').insert({ server_id: server.id, status_code: response.status, response_time: response.time, success: 'success' });
            }
            (0, serverTesting_1.serverTesting)(amountSuccess, server.id);
        }));
    }), 60000);
});
exports.startMonitoring = startMonitoring;
