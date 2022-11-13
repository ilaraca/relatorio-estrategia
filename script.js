const https = require('https');
const fs = require('fs');
require("dotenv").config();
let now = new Date(). toLocaleString();

const request = https.request(process.env.URL, (response) => {
    let data = '';
    response.on('data', (chunk) => {
        data = data + chunk.toString();
    });
  
    response.on('end', () => {
        const body = JSON.parse(data);

        JSONtoFileJSON(JSON.stringify(body,null,'\t'))
        
    });
})
  
request.on('error', (error) => {
    console.log('An error', error);
});
  
request.end() 


function JSONtoFileJSON(str) {
    fs.writeFile(`./json-output/${now}`+'.json', JSON.parse(JSON.stringify(str, null, '\t')), function (err) {
        if (err) throw err;
        console.log('Arquivo Salvo!');
    });
}

 



// const string = JSON.stringify(request)
// console.log(string)
    