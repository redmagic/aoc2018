const { concat, from } = require('rxjs');
const { count, filter, first, map, reduce } = require('rxjs/operators');

module.exports.run = (input) => {


    const solve2A = (ids) => {

        return new Promise((resolve, reject) => {

            const id$ = from(ids)
                .pipe(
                    map((id) => ({
                        id,
                        letterCount: Object.values(id.split('').reduce((charCount, char) => ({
                            ...charCount,
                            [char]: charCount[char] ? charCount[char] + 1 : 1
                        }), {}))
                    }))
                );

            const two$ = id$.pipe(filter(id => id.letterCount.includes(2)));

            const three$ = id$.pipe(filter(id => id.letterCount.includes(3)));

            concat(two$.pipe(count()), three$.pipe(count()))
                .pipe(
                    reduce((a, c) => a * c),
                    first()
                )
            .subscribe(resolve, reject);

        });


    };

    const solve2B = (deltas) => {

        const differentAtOneIndex = (one, other) => {

            let index = undefined;

            for (let i = 0, l = one.length; i < l; i++) {

                if (one[i] !== other[i]) {
                    if (index === undefined) {
                        index = i;
                    } else return undefined;
                }

            }

            return index;

        };

        const solve2b = (input) => {

            const pair = input.reduce(
            (a, id) => {

                a.untested.delete(id);

                a.untested.forEach(candidate => {

                    const index = differentAtOneIndex(id, candidate);

                    if (index !== undefined) a.pairs.push([id, candidate, index]);

                });

                return a;

            },
            {
                untested: new Set(input),
                pairs: []
            }
            ).pairs[0];

            return `${pair[0].slice(0, pair[2])}${pair[0].slice(pair[2]+1)}`;

        };

        return solve2b(deltas);

    };

    solve2A(input).then(
        (solution) => {

            console.log('2A:', solution);
            console.log('2B:', solve2B(input));
        }
    );

};
