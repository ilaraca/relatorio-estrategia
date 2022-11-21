import fs from 'fs'
import { google } from 'googleapis'
import dotenv from 'dotenv';

dotenv.config()

async function uploadFile(){

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
            'name': process.env.NAME_XLSX,
            'parents': [process.env.GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            body: fs.createReadStream(process.env.PATH_XLSX)
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id

    } catch(err){
        console.log('Upload file error', err)
    }
}


// export default { uploadFile }
uploadFile().then(data => {
    console.log(data)
})
