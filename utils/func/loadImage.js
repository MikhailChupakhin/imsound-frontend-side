// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\func\loadImage.js

export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error(`Ошибка загрузки изображения: ${url}`));
        img.src = url;
    });
}