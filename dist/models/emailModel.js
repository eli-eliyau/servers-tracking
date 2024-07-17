"use strict";
//From this file the functions communicate with the EMAIL table in the DB
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
exports.emailModel = void 0;
const knex_1 = __importDefault(require("../db/knex"));
const createEmail = (emailData) => __awaiter(void 0, void 0, void 0, function* () {
    const [server] = yield (0, knex_1.default)('email').insert(emailData).returning('*');
    return server;
});
const getAllEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('email').select('*');
});
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, knex_1.default)('email').select('name', 'email').where({ email }).first();
});
const updateEmail = (id, emailData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('email').where({ id }).update(emailData);
});
const deleteEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, knex_1.default)('email').where({ id }).del();
});
exports.emailModel = {
    createEmail,
    getAllEmails,
    getByEmail,
    updateEmail,
    deleteEmail
};
