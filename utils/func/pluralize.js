export default function pluralize(quantity, wordRoot) {
    if (wordRoot == 'товар') {
        if (quantity % 10 === 1 && quantity % 100 !== 11) {
            return `${quantity} ${wordRoot}`;
        } else if ([2, 3, 4].includes(quantity % 10) && ![12, 13, 14].includes(quantity % 100)) {
            return `${quantity} ${wordRoot}а`;
        } else {
            return `${quantity} ${wordRoot}ов`;
        }
    } else if (wordRoot == 'минут') {
        if (quantity % 10 === 1 && quantity % 100 !== 11) {
            return `${quantity} ${wordRoot}а`;
        } else if ([2, 3, 4].includes(quantity % 10) && ![12, 13, 14].includes(quantity % 100)) {
            return `${quantity} ${wordRoot}ы`;
        } else {
            return `${quantity} ${wordRoot}`;
        }
    }
}