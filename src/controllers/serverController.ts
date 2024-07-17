//The controller performs actions and communicates with the DB through the models
import { Request, Response } from 'express';
import { webServersModel } from '../models/webServersModel';
import { requestsModel } from '../models/requestsModel';


const createServer = async (req: Request, res: Response) => {
  const { name, url } = req.body;
  try {
    const newServer = await webServersModel.createServer(name, url);
    newServer
      ? res.status(201).json({ message: 'Server created successfully' })
      : res.status(400).json({ message: 'Invalid request data' });
  } catch (error) {
    console.error('Error creating server:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getAllServers = async (req: Request, res: Response) => {
  try {
    const servers = await webServersModel.getAllServers();
    servers.length > 0
      ? res.status(200).json(servers)
      : res.status(404).json({ message: 'No servers found' });
  } catch (error) {
    console.error('Error getting all servers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const getServerRequests = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const requests = await requestsModel.getAllRequests(id);
    requests.length > 0
      ? res.status(200).json(requests)
      : res.status(404).json({ message: 'No requests found for this server' });
  } catch (error) {
    console.error('Error getting server requests:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const updateServer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, url } = req.body;
  try {
    const updatedCount = await webServersModel.updateServer(id, {name, url});
    updatedCount > 0
      ? res.status(200).json({ message: 'Server updated successfully' })
      : res.status(404).json({ message: 'Server not found' });
  } catch (error) {
    console.error('Error updating server:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const deleteServer = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const delCount = await webServersModel.deleteServer(id);
    delCount > 0
      ? res.status(200).json({ message: 'Server deleted successfully' })
      : res.status(404).json({ message: 'Server not found or not deleted' });
  } catch (error) {
    console.error('Error deleting server:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getServerById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const server = await webServersModel.getServerById(id);
    const requests = await requestsModel.getLast10Requests(id);
    server
      ? res.status(200).json({ server, requests })
      : res.status(404).json({ message: 'Server not found' });
  } catch (error) {
    console.error('Error getting server by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const serverController = {
  createServer,
  getServerRequests,
  updateServer,
  deleteServer,
  getServerById,
  getAllServers
};
