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
exports.serverTesting = void 0;
const webServersModel_1 = require("../models/webServersModel");
const email_1 = require("../services/email");
const serverTesting = (successes, serverId, serverName) => __awaiter(void 0, void 0, void 0, function* () {
    const successfulRequests = successes.filter(s => s).length;
    if (successfulRequests >= 5) {
        yield webServersModel_1.webServersModel.updateServer(serverId, { status: 'healthy' });
    }
    else if (successes.slice(-3).filter(s => !s).length === 3) {
        const dataServer = yield webServersModel_1.webServersModel.getServerById(serverId);
        if (dataServer.status != 'unhealthy') {
            const updatedCount = yield webServersModel_1.webServersModel.updateServer(serverId, { status: 'unhealthy' });
            updatedCount && (yield (0, email_1.sendEmail)(serverId, serverName));
            console.log(updatedCount);
        }
    }
});
exports.serverTesting = serverTesting;
