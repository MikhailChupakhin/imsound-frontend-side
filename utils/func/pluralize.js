export default function pluralize(quantity, wordRoot) {
    if (quantity % 10 === 1 && quantity % 100 !== 11) {
        return `${wordRoot}`;
    } else if ([2, 3, 4].includes(quantity % 10) && ![12, 13, 14].includes(quantity % 100)) {
        return `${wordRoot}а`;
    } else {
        return `${wordRoot}ов`;
    }
}