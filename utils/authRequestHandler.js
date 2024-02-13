// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\authRequestHandler.js

// Обработчик запросов с Authorization Bearer

import { refreshAccessToken } from './refreshAccessToken';
import { sendRequest } from './sendRequest';
import { useRouter } from 'vue-router';

async function authRequestHandler(BASE_API_URL, endpoint, method, body = null) {
    const router = useRouter();

    try {
        const url = BASE_API_URL + endpoint
        const response = await sendRequest(url, method, body);
        console.log(response)
        if (response.status === 401) {
            const refreshResult = await refreshAccessToken(BASE_API_URL);

            if (refreshResult !== 1) {
                console.log('Токен НЕ обновлен!')
                await router.push({ path: '/', query: { showLoginModal: true }});
                return null;
            } else {
                console.log('Токен обновлен!')
                const updatedResponse = await sendRequest(url, method, body);
                return updatedResponse;
            }
        } else {
            return response;
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
}

export default authRequestHandler;