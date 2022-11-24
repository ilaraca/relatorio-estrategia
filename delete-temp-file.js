import cron from 'node-cron';
import { dirname } from 'path'
import { promises, unlink } from 'fs'
import debug from 'debug'
const { readdir } = promises
const { pathname: currentFile } = new URL(import.meta.url)
const cwd = dirname(currentFile)
const filesDir = `${cwd}/json-output`
const files = (await readdir(filesDir)).filter(item => !(!!~item.indexOf('.DS_Store')))
const log = debug('json-to-excel:')


export default cron.schedule('*/3 * * * *', async function deleteTempFile(){

    files.map(file => {
        unlink(`./json-output/${file}`, function (err) {
            console.log(file)
            if (err) throw err;
            log(`arquivo deletado!`)
        })
    })

})