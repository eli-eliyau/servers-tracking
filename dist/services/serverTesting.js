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
exports.serverTesting = void 0;
const knex_1 = __importDefault(require("../db/knex"));
//The function checks within the array of the five requests if there are five times true and updates the DB
const serverTesting = (arrSuccess, serverId) => __awaiter(void 0, void 0, void 0, function* () {
    let successCount = 0;
    arrSuccess.forEach((value) => {
        console.log(value);
        value === true && successCount++;
    });
    yield (0, knex_1.default)('web_servers').where({ id: serverId }).update({ status: successCount === 5 ? 'healthy' : 'unhealthy' });
    console.log('finsh');
});
exports.serverTesting = serverTesting;
