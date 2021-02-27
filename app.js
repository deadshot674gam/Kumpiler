const yargs = require('yargs');
const compile = require('./utils/ocr')
const { argv } = require('yargs')

// ------ imports ends here ------ //


yargs.version('1.0.0') // version specified

// commands specified

yargs.showHelpOnFail(true).command({
    command: 'run',
    describe: 'use to run code provided in the image input option.',
    builder: {
        imageUrl: {
            describe: 'URL/PATH of the Image of code snippet you want to run',
            demandOption: true,
            type: 'string'
        },
        stdin: {
            describe: 'Stdin if code requires any type of input, provide under this builder',
            demandOption: false,
            type: 'string'
        },
        lang: {
            describe: 'programming language of the code snippet',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        compile(argv.lang,argv.imageUrl,argv.stdin)        
    }
})

yargs.argv;