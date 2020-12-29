function shuffle(array) {
    const _array = [...array];

    for(let i = 0; i < array.length - 1; i++) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = _array[i];
        _array[i] = _array[randomIndex];
        _array[randomIndex] = temp;
    }

    return _array;
}

export default function initializeDeck() {
    let id = 0;
    const cards = [
        'Mikasa',
        'Eren',
        'Eren-Titan',
        'Levi',
        'Armin',
        'Armored-Titan',
        'Colossal-Titan',
        'Annie-Titan'
    ].reduce((acc, type) => {
        acc.push({
            id: id++,
            type
        });
        acc.push({
            id: id++,
            type
        });
        return acc;
    }, []);

    return shuffle(cards);
}