//From this file the functions communicate with the requests table from the DB
import knex from '../db/knex';


interface TableRequests {
  id?: string;
  server_id: string
  response_time: number
  status_code: number
  success: boolean
}

  const createRequests = async (data:TableRequests): Promise<TableRequests> => {
  const [server] = await knex('requests')
    .insert(data)
    .returning('*');
  return server;
};

const getAllRequests = async (server_id: string): Promise<TableRequests[]> => {
  return await knex('requests').where({ server_id }).orderBy('created_at', 'desc');
};

const getLast10Requests = async (server_id: string): Promise<TableRequests[]> => {
  return await knex('requests').where({ server_id }).orderBy('created_at', 'desc').limit(10);
};

export const requestsModel = {
  createRequests,
  getAllRequests,
  getLast10Requests

}