import fs from 'fs';

function dataAtual(){
    let dataAtual = [];
    let finaldata;
    new Date(). toLocaleString().split('').forEach(e => {
        dataAtual.push(e.replace('/', '-'))
    })
    finaldata = dataAtual.join('')
    return finaldata;
}

function JSONtoFileJSON(str) {
    fs.writeFile(`./json-output/${dataAtual()}`+'.json', JSON.parse(JSON.stringify(str, null, '\t')), function (err) {
        if (err) throw err;
        console.log('Arquivo Salvo!');
    });
}

export default { dataAtual, JSONtoFileJSON }