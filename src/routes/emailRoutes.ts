//In this file there are routes that belong to the email sending process
import { Router } from 'express';
import { emailController } from '../controllers/emailController';

const emailRouters = Router();

emailRouters.post('/create', emailController.createEmail)
    .get('/get-all', emailController.getAllEmails)
    .put('/update/:id', emailController.updateEmail)
    .delete('/delete/:id', emailController.deleteEmail)

export default emailRouters;
