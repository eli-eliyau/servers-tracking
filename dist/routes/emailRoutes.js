"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//In this file there are routes that belong to the email sending process
const express_1 = require("express");
const emailController_1 = require("../controllers/emailController");
const emailRouters = (0, express_1.Router)();
emailRouters.post('/create', emailController_1.emailController.createEmail)
    .get('/get-all', emailController_1.emailController.getAllEmails)
    .put('/update/:id', emailController_1.emailController.updateEmail)
    .delete('/delete/:id', emailController_1.emailController.deleteEmail);
exports.default = emailRouters;
