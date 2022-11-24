import express from 'express';
import {ManagerCron} from './manager-cron.js';

const managerCron = new ManagerCron();

let app = express();

app.listen(3333, () => {
    // console.log('Running on port 333')
    managerCron.run()
});