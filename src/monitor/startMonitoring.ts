import knex from '../db/knex';
import { Worker } from 'worker_threads';
import path from 'path';

const BATCH_SIZE = 1000;
const REQUEST_INTERVAL = 60000;

export const startMonitoring = async () => {
  setInterval(async () => {
    const servers = await knex('web_servers').select('*');
    for (let i = 0; i < servers.length; i += BATCH_SIZE) {
      const batch = servers.slice(i, i + BATCH_SIZE);
      batch.forEach(server => {
        const worker = new Worker(path.resolve(__dirname, 'worker.js'), {
          workerData: { server }
        });

        worker.on('message', (message) => {
          if (message === 'done') {
            worker.terminate();
          }
        });

        worker.on('error', (error) => {
          console.error('Worker error:', error);
          worker.terminate();
        });
      });
    }
  }, REQUEST_INTERVAL);
};
