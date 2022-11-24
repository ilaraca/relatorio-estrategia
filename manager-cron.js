import jsonToExcel from './json-to-excel.js';
import excelToGoogleDrive from './excel-to-google-drive.js'
import deleteTempFile from './delete-temp-file.js';

class ManagerCron {
    constructor(){
        this.jobs = [jsonToExcel, excelToGoogleDrive, deleteTempFile]
    }

    run(){
        this.jobs.forEach(job => {
            job.start()
        });
    }
}

export {ManagerCron};