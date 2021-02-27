const tesseract = require('tesseract.js');
const fs = require('fs');
const request = require('request');

const ocr = (imageUrl, callback) => {
    tesseract.recognize(
        imageUrl,
        'eng'
    ).then(({ data: { text } }) => {
        callback(text)
    })
}

const compile = (lang, imageUrl, stdin) => {
    ocr(imageUrl, (script) => {

        var credential = fs.readFileSync("./credentials.json")
        credential = JSON.parse(credential.toString())

        var program = {
            script: script,
            language: lang,
            versionIndex: "0",
            stdin: stdin,
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
                console.log('Execution Time:', body.cpuTime);
                console.log('Memory:', body.memory);
                console.log('Output: ', body.output);
            }
        })

    })
}

module.exports = compile