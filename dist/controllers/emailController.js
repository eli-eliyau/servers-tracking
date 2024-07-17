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
exports.emailController = void 0;
const emailModel_1 = require("../models/emailModel");
const createEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingEmail = yield emailModel_1.emailModel.getByEmail(req.body.email);
        if (existingEmail)
            return res.status(400).json({ message: 'Email is required' });
        const email = yield emailModel_1.emailModel.createEmail(req.body);
        email ? res.status(201).json({ message: 'Email successfully created' }) : res.status(400).json({ message: 'Invalid request data' });
    }
    catch (error) {
        console.error('Error creating email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const getAllEmails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield emailModel_1.emailModel.getAllEmails();
        emails.length > 0 ? res.status(200).json(emails) :
            res.status(404).json({ message: 'No emails found' });
    }
    catch (error) {
        console.error('Error getting all emails:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const getByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield emailModel_1.emailModel.getByEmail(req.params.email);
        if (email) {
            res.status(200).json(email);
        }
        else {
            res.status(404).json({ message: 'Email not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const updateEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCount = yield emailModel_1.emailModel.updateEmail(req.params.id, req.body);
        updatedCount > 0 ? res.status(200).json({ message: 'Email updated successfully' })
            : res.status(404).json({ message: 'Email not found' });
    }
    catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const deleteEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delCount = yield emailModel_1.emailModel.deleteEmail(req.params.id);
        delCount > 0 ? res.status(200).json({ message: 'Email deleted successfully' }) :
            res.status(404).json({ message: 'Email not found or not deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.emailController = {
    createEmail,
    getAllEmails,
    getByEmail,
    updateEmail,
    deleteEmail
};
