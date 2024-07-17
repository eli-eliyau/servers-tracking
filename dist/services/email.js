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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const emailModel_1 = require("../models/emailModel");
//The function receives all emails from DB and sends them a message about an unhealthy server when three consecutive requests have failed
const sendEmail = (serverId, serverName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield emailModel_1.emailModel.getAllEmails();
        if (emails.length === 0) {
            throw new Error('No emails found');
        }
        const emailAddresses = emails.map(value => value.email);
        let transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'server1eli@gmail.com',
                pass: 'ajfn cula kepv sbqb',
            },
        });
        let emailOptions = {
            from: 'server1eli@gmail.com',
            to: emailAddresses,
            subject: 'Server Error',
            text: `A server named ${serverName} is now defined as unhealthy \n SERVER ID : ${serverId}`,
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(emailOptions, (err, info) => {
                if (err) {
                    console.error('Error sending email', err);
                    return reject({ message: 'Error sending email' });
                }
                else {
                    console.log('Email sent: ' + info.response);
                    return resolve({ message: 'Email sent successfully' });
                }
            });
        });
    }
    catch (error) {
        console.error('Error in sendEmail function:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
