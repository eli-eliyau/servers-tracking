import { webServersModel } from '../models/webServersModel';
import { Server } from '../models/webServersModel';
import validator from 'validator';

//The function checks URL integrity
const isValidURL = (url: string): boolean => {
    return validator.isURL(url, { require_protocol: true });
};

//The function checks if there are duplicates in the input of the request
export const validateServersData = (servers: Server[]): string | null => {
  for (const server of servers) {
    if (!server.name || !server.url) {
      return 'Invalid request data: Missing name or URL';
    }
    if (!isValidURL(server.url)) {
        return `Invalid URL format: ${server.url}`;
    }
  }

  const seenNames = new Set();
  const seenUrls = new Set();

  for (const server of servers) {
    if (seenNames.has(server.name) || seenUrls.has(server.url)) {
      return 'Duplicate servers found in request data';
    }
    seenNames.add(server.name);
    seenUrls.add(server.url);
  }

  return null;
};

//The function checks if the servers from the input are not in the DB so that there will be no duplication of name or URL
export const checkExistingServers = async (servers: Server[]) => {
  const existingNames: string[] = [];
  const existingUrls: string[] = [];
  const newServers: Server[] = [];

  for (const server of servers) {
    const existingByName = await webServersModel.getServerByName(server.name);
    const existingByUrl = await webServersModel.getServerByUrl(server.url);

    if (existingByName) {
      existingNames.push(server.name);
    } else if (existingByUrl) {
      existingUrls.push(server.url);
    } else {
      newServers.push(server);
    }
  }

  return { existingNames, existingUrls, newServers };
};
