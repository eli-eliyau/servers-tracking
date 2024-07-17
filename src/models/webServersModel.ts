//From this file the functions communicate with the web_servers table from the DB
import knex from '../db/knex';

export interface Server {
  id: string;
  name: string;
  url: string;
  status: string
}



const createServers = async (servers: Server[]): Promise<Server[]> => {
  const insertedServers = await knex('web_servers')
    .insert(servers)
    .returning('*');
  return insertedServers;
};

const getAllServers = async (): Promise<Server[]> => {
  return await knex('web_servers').select('id', 'name', 'status','url');
};


const getServerById = async (id: string): Promise<Server> => {
  return await knex('web_servers').where({ id }).first();
};

const getServerByUrl = async (url: string): Promise<Server> => {
  return await knex('web_servers').where({ url }).first();
};

const getServerByName = async (name: string): Promise<Server> => {
  return await knex('web_servers').where({ name }).first();
};

const updateServer = async (id: string, data: {
  name?: string;
  url?: string;
  status?: string
}): Promise<number> => {
  return await knex('web_servers').where({ id }).update(data);
};

const deleteServer = async (id: string): Promise<number> => {
  return await knex('web_servers').where({ id }).del();
};

export const webServersModel = {
  createServers,
  getAllServers,
  getServerById,
  getServerByUrl,
  getServerByName,
  updateServer,
  deleteServer,

}