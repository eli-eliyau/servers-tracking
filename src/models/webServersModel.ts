//From this file the functions communicate with the web_servers table from the DB
import knex from '../db/knex';

export interface Server {
  id: string;
  name: string;
  url: string;
  status: string
}



const createServer = async (name: string, url: string): Promise<Server> => {
  const [server] = await knex('web_servers')
    .insert({ name, url })
    .returning('*');
  return server;
};

const getAllServers = async (): Promise<Server[]> => {
  return await knex('web_servers').select('id', 'name', 'status');
};


const getServerById = async (id: string): Promise<Server> => {
  return await knex('web_servers').where({ id }).first();
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
  createServer,
  getAllServers,
  getServerById,
  updateServer,
  deleteServer,

}