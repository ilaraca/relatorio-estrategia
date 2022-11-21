import fetch from 'node-fetch';
import dotenv from 'dotenv';
import utils from './utils.js'
import cron from 'node-cron';

dotenv.config()

cron.schedule('*/10 * * * *', async () => {
    console.log("gravando um novo .json a cada 10 minutos");

    await fetch(process.env.URL, {
        method: 'GET'
    })
        .then(response => response.text())
        .then(text => {
            let body = JSON.parse(text)
            utils.JSONtoFileJSON(JSON.stringify(body, null, '\t'))
        });
})