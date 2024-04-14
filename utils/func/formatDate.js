export function formatDate(timestamp) {
    const date = new Date(timestamp);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  export function formatDateFull(timestamp) {
    const months = [
      "января", "февраля", "марта",
      "апреля", "мая", "июня",
      "июля", "августа", "сентября",
      "октября", "ноября", "декабря"
    ];
  
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day} ${month} ${year} г. ${hours}:${minutes}`;
  }