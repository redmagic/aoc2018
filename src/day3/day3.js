const sample = [
    '#1 @ 1,3: 4x4',
    '#2 @ 3,1: 4x4',
    '#3 @ 5,5: 2x2'
];

module.exports.run = (input) => {

    const flatten = (arr) => arr.reduce((a, c) => a.concat(c), []);

    const exp = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/;

    const claimToCoords = ({x, y, w, h}) => {

        return Array.from({length: w * h}, (_, i) => [x + i % w, y + Math.trunc(i / w)]);

    };
    const claimsToCoordinates = (claims) => claims.map((claim) => {

        const [, id, x, y, w, h] = [].concat(exp.exec(claim)).map((n) => parseInt(n, 10));

        const coords = claimToCoords({x, y, w, h});
        coords.id = id;

        return coords;

    });

    const claimsAsCoordinates = claimsToCoordinates(input);
    const inventory = flatten(claimsAsCoordinates).reduce(
        (inventory, coordinate) => {

            const key = `x${coordinate[0]}y${coordinate[1]}`;

            inventory[key] = inventory[key] ? inventory[key] + 1 : 1;

            return inventory;
        },
        {}
    );

    const solve3a = (input) => {

        return Object.values(inventory).filter(count => count > 1).length;

    };

    const solve3b = (input) => {

        try {

            claimsAsCoordinates.forEach((coordinates) => {

                const occupationCount = coordinates.reduce(
                    (count, coordinate) => {

                        const key = `x${coordinate[0]}y${coordinate[1]}`;

                        return count + inventory[key];

                    },
                    0
                );

                if (occupationCount === coordinates.length) throw new Error(coordinates.id);

            });

        } catch (x) {
            return x.message;
        }

    };

    console.log('3A:', solve3a(input));
    console.log('3B:', solve3b(input));

};
