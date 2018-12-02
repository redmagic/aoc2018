const readInput = require('./input').readInput;

if (process.argv.length < 3) {

    console.log(`Usage: node ${process.argv[1]} <n>`);
    process.exit(1);

} else {

    const dayNr = process.argv[2];

    readInput(dayNr).then(
        (input) => require(`${process.cwd()}/src/day${dayNr}/day${dayNr}`).run(input)
    )

}

