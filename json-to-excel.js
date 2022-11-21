import XLSX from 'xlsx'
import path from 'path'

//Nome do Header Sheet
const workSheetColumnName = ["Id",
    "Data Atual",
    "Hora Atual",
    "Cor",
    "Número",
    "Código"];
const workSheetName = 'doubles'; 
const filePath = './doubles.xlsx';
const pathToTheFile = './json-output/final.json'

import { dirname, join } from 'path'
import { promisify } from 'util'
import { promises, createReadStream, createWriteStream, readFile, writeFile } from 'fs'
import { pipeline, Transform } from 'stream'
import StreamConcat from 'stream-concat'
import debug from 'debug'

const pipelineAsync = promisify(pipeline)
const { readdir } = promises

//Cria um log sem utilizar o console.log
const log = debug('app:concat')

const { pathname: currentFile } = new URL(import.meta.url)
const cwd = dirname(currentFile)
const filesDir = `${cwd}/json-output`
const output = `${cwd}/json-output/final.json`

console.time('concat-data')
const files = (await readdir(filesDir)).filter(item => !(!!~item.indexOf('.DS_Store')))

log(`processando ${files}`)
const ONE_SECOND = 1000

setInterval(() => process.stdout.write('.'), ONE_SECOND).unref()

const streams = files.map(
    item => createReadStream(join(filesDir, item))
)
const combinedStreams = new StreamConcat(streams)
const finalStream = createWriteStream(output)
const handleStream = new Transform({
    transform: (chunk, encoding, cb) => {
        const data = JSON.parse(chunk)
        return cb(null, JSON.stringify(data, null, '\t'))
    }
})

setTimeout(() => {
    log(`entrando no setTimout`)
    readFile(pathToTheFile, 'utf8', function (err, data) {
        var result = data.replace(/]\[/g, ',');
        if (err) return console.log(err);
        writeFile(pathToTheFile, result, 'utf8', function (err) {
            log(`corrigindo o .json criado sem os ][`)
            let doubleListJSON = JSON.parse(result)
            console.log(doubleListJSON)
            exportDoublesToExcel(doubleListJSON, workSheetColumnName, workSheetName, filePath)
            if (err) return console.log(err);
        });
    });

    function exportDoublesToExcel(doubleList, workSheetColumnNames, workSheetName, filePath) {
        log(`exportando o .json final para excel`)
        const data = doubleList.map(double => {
            switch(double.color) {
                case 0:
                  double.color = 'branco'
                  break;
                case 1:
                  double.color = 'vermelho'
                  break;
                default:
                  double.color = 'preto'
              }
            return [double.id
                , formatDateNow(new Date(double.created_at).toLocaleDateString())
                , new Date(double.created_at).toLocaleTimeString()
                , double.color
                , double.roll
                , double.server_seed]
        })
        const workBook = XLSX.utils.book_new();
        const workSheetData = [
            workSheetColumnNames,
            ...data
        ];
        const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
        XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
        XLSX.writeFile(workBook, path.resolve(filePath));
        return true;
    }

    function formatDateNow(date){
        let dateNow = [];
        let finalDate;
        date.split('').forEach(dt => {
            dateNow.push(dt.replace('/', '-'))
        })
        finalDate = dateNow.join('')
        return finalDate;
    }

}, 5000)

await pipelineAsync(
    combinedStreams,
    handleStream,
    finalStream,
)
log(`${files.length} arquivos mergeados on ${output}`)
console.timeEnd('concat-data')