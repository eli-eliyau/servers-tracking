//The controller performs actions and communicates with the DB through the models
import { Request, Response } from 'express';
import { emailModel, TableEmail } from '../models/emailModel';
import validator from 'validator'; 

const createEmail = async (req: Request, res: Response) => {
    const { name, email }: TableEmail = req.body;
    
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existingEmail = await emailModel.getByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const newEmail = await emailModel.createEmail({ name, email });
        newEmail
            ? res.status(201).json({ message: 'Email successfully created' })
            : res.status(400).json({ message: 'Invalid request data' });
    } catch (error) {
        console.error('Error creating email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllEmails = async (req: Request, res: Response) => {
    try {
        const emails = await emailModel.getAllEmails();
        emails.length > 0 ? res.status(200).json(emails) : res.status(404).json({ message: 'No emails found' });
    } catch (error) {
        console.error('Error getting all emails:', error);

        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getByEmail = async (req: Request, res: Response) => {
    try {
        const email = await emailModel.getByEmail(req.params.email);
        if (email) {
            res.status(200).json(email);
        } else {
            res.status(404).json({ message: 'Email not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateEmail = async (req: Request, res: Response) => {
    const { name, email }: TableEmail = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }
    try {
        const updatedCount = await emailModel.updateEmail(req.params.id, req.body);
        updatedCount > 0 ? res.status(200).json({ message: 'Email updated successfully' })
            : res.status(404).json({ message: 'Email not found' });
    } catch (error) {
        console.error('Error updating email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteEmail = async (req: Request, res: Response) => {
    try {
        const delCount = await emailModel.deleteEmail(req.params.id);
        delCount > 0 ? res.status(200).json({ message: 'Email deleted successfully' }) :
            res.status(404).json({ message: 'Email not found or not deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const emailController = {
    createEmail,
    getAllEmails,
    getByEmail,
    updateEmail,
    deleteEmail
}