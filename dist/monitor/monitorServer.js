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
exports.monitorServer = void 0;
const requestsModel_1 = require("../models/requestsModel");
const fetchServerStatus_1 = require("../utils/fetchServerStatus");
const serverTesting_1 = require("./serverTesting");
const monitorServer = (server) => __awaiter(void 0, void 0, void 0, function* () {
    let amountSuccess = [];
    for (let i = 0; i < 5; i++) {
        const response = yield (0, fetchServerStatus_1.fetchServerStatus)(server.url);
        const success = response.status >= 200 && response.status < 300 && response.time < 60000;
        console.log(server.name, ' ', success);
        amountSuccess.push(success);
        yield requestsModel_1.requestsModel.createRequests({
            server_id: server.id,
            status_code: response.status,
            response_time: response.time,
            success: success
        });
    }
    yield (0, serverTesting_1.serverTesting)(amountSuccess, server.id, server.name);
});
exports.monitorServer = monitorServer;
