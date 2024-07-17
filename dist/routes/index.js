"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRouter = exports.emailRouters = void 0;
const emailRoutes_1 = __importDefault(require("./emailRoutes"));
exports.emailRouters = emailRoutes_1.default;
const serverRoutes_1 = __importDefault(require("./serverRoutes"));
exports.serverRouter = serverRoutes_1.default;
