export function formatPrice(price) {
    const priceString = String(price);
    
    if (priceString.includes('.')) {
        const parts = priceString.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
        return parts.join('.') + ' ₽';
    } else {
        const formattedPrice = Number(price).toFixed(2);
        const parts = formattedPrice.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
        return parts.join('.') + ' ₽';
    }
}

export function formatPriceShort(price) {
    const formattedPrice = Number(price).toFixed(0);
    const priceString = String(formattedPrice);

    const parts = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    return parts + ' ₽';
}