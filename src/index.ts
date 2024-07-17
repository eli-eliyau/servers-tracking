import express from 'express';
import * as routes from './routes';
import cors from 'cors'
import { startMonitoring } from './monitor/startMonitoring';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use('/api/server', routes.serverRouter);
app.use('/api/email', routes.emailRouters);

startMonitoring();

app.listen(3000, () => {
    console.log('Server is running on port 3000');

});


