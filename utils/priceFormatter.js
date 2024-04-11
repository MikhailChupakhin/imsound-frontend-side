export function formatPrice(price) {
    const roundedPrice = Math.round(price * 100) / 100;

    const priceString = roundedPrice.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        currency: 'RUB',
        style: 'currency',
        currencyDisplay: 'symbol'
    });

    return priceString.replace(',', '.');
}

export function formatPriceShort(price) {
    const formattedPrice = Number(price).toFixed(0);
    const priceString = String(formattedPrice);

    const parts = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return parts + ' ₽';
}