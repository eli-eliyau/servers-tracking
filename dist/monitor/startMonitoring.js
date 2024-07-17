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
const worker_threads_1 = require("worker_threads");
const path_1 = __importDefault(require("path"));
const BATCH_SIZE = 1000;
const REQUEST_INTERVAL = 60000;
const startMonitoring = () => __awaiter(void 0, void 0, void 0, function* () {
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const servers = yield (0, knex_1.default)('web_servers').select('*');
        for (let i = 0; i < servers.length; i += BATCH_SIZE) {
            const batch = servers.slice(i, i + BATCH_SIZE);
            batch.forEach(server => {
                const worker = new worker_threads_1.Worker(path_1.default.resolve(__dirname, 'worker.js'), {
                    workerData: { server }
                });
                worker.on('message', (message) => {
                    if (message === 'done') {
                        worker.terminate();
                    }
                });
                worker.on('error', (error) => {
                    console.error('Worker error:', error);
                    worker.terminate();
                });
            });
        }
    }), REQUEST_INTERVAL);
});
exports.startMonitoring = startMonitoring;
