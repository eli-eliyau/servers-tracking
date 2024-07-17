//From this file the functions communicate with the EMAIL table in the DB

import knex from '../db/knex';


export interface TableEmail {
    name: string
    email: string
}


const createEmail = async (emailData: TableEmail): Promise<TableEmail> => {
    const [server] = await knex('email').insert(emailData).returning('*');
    return server
};

const getAllEmails = async (): Promise<TableEmail[]> => {
    return await knex('email').select('*');
};

const getByEmail = async (email: string) => {
    return knex('email').select('name','email').where({ email }).first();
};

const updateEmail = async (id: string, emailData: { name?: string, email?: string }): Promise<number> => {
    return await knex('email').where({ id }).update(emailData)
};

const deleteEmail = async (id: string):Promise<number> => {
    return await knex('email').where({ id }).del();
};

export const emailModel = {
    createEmail,
    getAllEmails,
    getByEmail,
    updateEmail,
    deleteEmail
}