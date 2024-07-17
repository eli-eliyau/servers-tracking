const { parentPort, workerData }=require('worker_threads');
const { monitorServer } =require('./monitorServer.js');

const run = async () => {
  await monitorServer(workerData.server);
  parentPort?.postMessage('done');
};

run();
