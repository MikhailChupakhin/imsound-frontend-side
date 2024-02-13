// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\sendRequest.js

// Функция отправки HTTP-запроса
export async function sendRequest(url, method, body = null) {
    let headers = {};
    if (method === 'OPTIONS') {
        headers = {};
    } else {
        headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });

        // Возвращаем объект ответа
        return response;
    } catch (error) {
        // Обрабатываем ошибки при отправке запроса
        console.error('sendRequestError:', error);
    }
}