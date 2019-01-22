export const currencies = [
    {sign: '$', name: 'dollar'},
    {sign: '€', name: 'euro'},
    {sign: '₽', name: 'ruble'}
];

export function getCurrencyByName(name: string) {
    let res = null;
    currencies.forEach(c => {
        if (c.name === name || c.sign === name) {
            res = c;
        }
    });
    return res;
}
