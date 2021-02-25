const tesseract = require('tesseract.js');
const request = require('request');
const fs = require('fs');
// const yargs = require('yargs');
// const { worker } = require('cluster');
// const { createWorker } = Tesseract;
//   const worker = createWorker({
//     workerPath: 
//     langPath: 'traineddata  path here',
//  }


// setTimeout(() => {console.log(input)},4000)


var ocr = (imageUrl) => {
    tesseract.recognize(
        imageUrl,
        'eng'
    ).then(({ data: { text } }) => {
        fs.writeFileSync('new.txt', text)
    })
}



const compile = (language,input) => {

    var credential = fs.readFileSync("credentials.json")
    credential = JSON.parse(credential.toString())

    var program = {
        script: fs.readFileSync('new.txt').toString(),
        language: language,
        versionIndex: "0",
        stdin: input,
        clientId: credential.clientID,
        clientSecret: credential.clientSecret
    };

    request({
        url: 'https://api.jdoodle.com/v1/execute',
        method: "POST",
        json: program
    }, (error, response, body) => {
        if (error) {
            console.log('error:', error);
        } else {
            console.log('Output: ', body.output);
        }
        // console.log('statusCode:', response && response.statusCode);
    })
}

module.exports = {
    ocr: ocr,
    compile: compile
}