const { from } = require('rxjs');
const { bufferCount, filter, groupBy, map, mergeMap, reduce, tap } = require('rxjs/operators');

module.exports.run = (input) => {

    const start = Date.now();

    const notes = input.sort();
    const guardIdExp = /#(\d+)/;
    const timeExp = /(\d+)]/;
    let currentGuard;

    const minutesPerGuard$ = from(notes)
    .pipe(
        filter((line) => {

            const [,id] = [].concat(guardIdExp.exec(line));
            if (id) {
                currentGuard = id;
                return false;
            } else return true

        }),
        groupBy(() => currentGuard, (entry) => parseInt(timeExp.exec(entry)[1], 10)),
        mergeMap((guard$) => {
            return guard$.pipe(
                bufferCount(2),
                reduce((acc, cur) => [...acc, cur], [guard$.key])
            )
        })
    );

    // minutesPerGuard$.subscribe(console.log);

    const answer$ = minutesPerGuard$
    .pipe(
        map(minutesPerGuard => {
            return [
                minutesPerGuard[0],
                minutesPerGuard
                    .slice(1)
                    .reduce((pattern, [start, end]) => {
                        for (let i=start; i < end; i++) pattern[i]++;
                        return pattern;
                    }, Array.from({length:60}, () => 0))
            ];
        }),
        map(guard => {
            const info = guard[1].reduce((a, c, i) => ({total: a.total+c, minute: c > a.minute[1] ? [i, c] : a.minute}), {total:0, minute:[0, 0]});
            return {
                id: guard[0],
                ...info
            }
        }),
        reduce((sleepiestGuard, someGuard) => someGuard.total > sleepiestGuard.total ? someGuard : sleepiestGuard),
        tap(console.log),
        map(sleepiestGuard => sleepiestGuard.id * sleepiestGuard.minute[0])
    );

    answer$.subscribe(console.log);

    console.log(`${Date.now() - start}ms`);

};
