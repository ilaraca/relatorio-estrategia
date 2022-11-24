import fs from 'fs'
import { google } from 'googleapis'
import dotenv from 'dotenv';
import debug from 'debug';
import cron from 'node-cron';
import utils from './utils.js'
//Cria um log sem utilizar o console.log
const log = debug('app:excel-to-google-drivegit ')
const filePath = `./excel-output/doubles-${utils.dataAtual()}.xlsx`;


dotenv.config()

export default cron.schedule('*/2 * * * *', async function excelToGoogleDrive (){
    async function uploadFile() {

        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: process.env.CREDENDIALS,
                scopes: ['https://www.googleapis.com/auth/drive']
            })

            const driveService = google.drive({
                version: 'v3',
                auth
            })

            const fileMetaData = {
                'name': `double-${utils.dataAtual()}.xlsx`,
                'parents': [process.env.GOOGLE_API_FOLDER_ID]
            }

            const media = {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                body: fs.createReadStream(filePath)
            }

            const response = await driveService.files.create({
                resource: fileMetaData,
                media: media,
                field: 'id'
            })
            return response.data.id

        } catch (err) {
            log(`upload file error: ${err}`)
        }
    }


    // export default { uploadFile }
    uploadFile().then(data => {
        console.log(data)
    })
})