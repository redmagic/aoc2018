module.exports.run = (input) => {

    const solve1A = (deltas) => deltas.reduce((a, c) => a + parseInt(c, 10), 0);

    const solve1B = (deltas) => {

        const results = new Set();
        let solution = false;
        let frequency = 0;

        do {

            frequency = deltas.reduce(
                (a, c) => {

                    const freq = a + parseInt(c, 10);

                    if (results.has(freq) && !solution) {
                        solution = freq;
                    } else {
                        results.add(freq);
                    }

                    return freq;

                },
                frequency
            );

        } while(!solution);

        return solution;

    };

    console.log('1A:', solve1A(input));
    console.log('1B:', solve1B(input));

};
