function distribution(tapes) {
    dist = {}
    tapes.forEach(tape => {
        if (dist[normalize(tape)]) {
            dist[normalize(tape)] += 1
        } else {
            dist[normalize(tape)] = 1
        }

    });
    return dist
}

function normalize(tape) {
    if (Array.from(tape).every(e => e === '0')) {
        return '0'
    }

    return tape.replace(/^0+/, '').replace(/0+$/, '');
}

tapes = ["111100000000000000000", "001111", "101010101", "0000000000101010101", "101010101000000000", "1", "0000000"]
console.log(`tapes: ${tapes}`, "\n\n", `distribution: ${JSON.stringify(distribution(tapes))}`)