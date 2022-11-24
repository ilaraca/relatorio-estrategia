import fs from 'fs';

function dataHoraAtual(){
    let dataAtual = [];
    let finaldata;
    new Date(). toLocaleTimeString().split('').forEach(e => {
        dataAtual.push(e.replace('/', '-'))
    })
    finaldata = dataAtual.join('')
    return finaldata;
}

function dataAtual(){
    let dataAtual = [];
    let finaldata;
    new Date(). toLocaleDateString().split('').forEach(e => {
        dataAtual.push(e.replace('/', '-'))
    })
    finaldata = dataAtual.join('')
    return finaldata;
}

function JSONtoFileJSON(str) {
    fs.writeFile(`./json-output/${dataHoraAtual()}`+'.json', JSON.parse(JSON.stringify(str, null, '\t')), function (err) {
        if (err) throw err;
        console.log('Arquivo Salvo!');
    });
}

export default { dataHoraAtual, dataAtual, JSONtoFileJSON }