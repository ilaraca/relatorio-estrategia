const https = require('https');
const fs = require('fs');
require("dotenv").config();
let now = new Date(). toLocaleString();
const data_atual = now;

const request = https.request(process.env.URL, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });
  
    response.on('end', () => {
        const body = JSON.parse(data);

        fileToJSON(JSON.stringify(body))
        
    });
})
  
request.on('error', (error) => {
    console.log('An error', error);
});
  
request.end() 

// console.log(process.env.URL)
// console.log(JSON.stringify(request))
// console.log(fs)


function fileToJSON(str) {
    fs.appendFile(`./json-output/${data_atual}`+'.json', JSON.stringify(str), function (err) {
        if (err) throw err;
        console.log('Arquivo Salvo!');
    });
}


const file = JSON.stringify(request);

console.log("aquuuuuui"+file)
// const string = JSON.stringify(request)
// console.log(string)
    