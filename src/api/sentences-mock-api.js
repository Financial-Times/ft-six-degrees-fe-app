const data = [
    {
        id: 0,
        value: 'If you owe your bank a hundred pounds, you have a problem. But if you owe a million, it has.',
        author: 'John Maynard Keynes'
    }, {
        id: 1,
        value: 'We have always known that heedless self interest was bad morals, we now know that it is bad economics.',
        author: 'Franklin D. Roosevelt'
    }, {
        id: 2,
        value: 'The curious mind embraces science; the gifted and sensitive, the arts; the practical, business; the leftover becomes an economist.',
        author: 'Nassim Nicholas Taleb'
    }, {
        id: 3,
        value: 'Inflation is always and everywhere a monetary phenomenon.',
        author: 'Milton Friedman'
    }, {
        id: 4,
        value: 'I have never known much good done by those who affected to trade for the public good.',
        author: 'Adam Smith'
    }];

class SentencesMockApi {
    static getData() {
        return new Promise((resolve, reject) => {//eslint-disable-line no-unused-vars
            setTimeout(() => {
                resolve(Object.assign([], data));
            }, 3000);
        });
    }
}

export default SentencesMockApi;