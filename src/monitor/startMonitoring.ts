import { webServersModel } from '../models/webServersModel';
import { monitorServer } from './monitorServer';

const BATCH_SIZE = 1000;
const REQUEST_INTERVAL = 60000;

//The function performs every minute and divides the amount of servers for load distribution
export const startMonitoring = async () => {
  setInterval(async () => {
    try {
      const servers = await webServersModel.getAllServers();

      for (let i = 0; i < servers.length; i += BATCH_SIZE) {
        const batch = servers.slice(i, i + BATCH_SIZE);
        for (const server of batch) {
          
          try {
            await monitorServer(server);
          } catch (error) {
            console.error(`Error monitoring server ${server.id}:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching servers:', error);
    }
  }, REQUEST_INTERVAL);
};
