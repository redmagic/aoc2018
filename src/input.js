const readline = require('readline');
const fs = require('fs');

module.exports.readInput = (dayNr) => {

    return new Promise((resolve, reject) => {

        const input = [];

        const rl = readline.createInterface({
            input: fs.createReadStream(`${process.cwd()}/src/day${dayNr}/input`),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            input.push(line);
        }).on('close', () => {
            resolve(input);
        }).on('error', (x) => {
            reject(x);
        });

    });

};
