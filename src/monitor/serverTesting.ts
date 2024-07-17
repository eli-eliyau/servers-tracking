import { webServersModel } from '../models/webServersModel';
import { sendEmail } from '../services/email';

//The function checks how many successes there are and determines in the DB if the server is healthy
export const serverTesting = async (successes: boolean[], serverId: string, serverName: string) => {
    const successfulRequests = successes.filter(s => s).length;

    if (successfulRequests >= 5) {
        await webServersModel.updateServer(serverId, { status: 'healthy' })

    } else if (successes.slice(-3).filter(s => !s).length === 3) {
        const dataServer = await webServersModel.getServerById(serverId)
        
        if (dataServer.status != 'unhealthy') {
            const updatedCount = await webServersModel.updateServer(serverId, { status: 'unhealthy' })
            updatedCount && await sendEmail(serverId, serverName);
        }
    }
};
