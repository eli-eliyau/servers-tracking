import { requestsModel } from '../models/requestsModel';
import { Server } from '../models/webServersModel';
import { fetchServerStatus } from '../utils/fetchServerStatus';
import { serverTesting } from './serverTesting';

export const monitorServer = async (server: Server) => {
  let amountSuccess: boolean[] = [];

  for (let i = 0; i < 5; i++) {
    const response = await fetchServerStatus(server.url);
    const success = response.status >= 200 && response.status < 300 && response.time < 60000;
    console.log(server.name, ' ', success);

    amountSuccess.push(success);

    await requestsModel.createRequests({
      server_id: server.id,
      status_code: response.status,
      response_time: response.time,
      success: success
    })

  }

  await serverTesting(amountSuccess, server.id, server.name);
};
