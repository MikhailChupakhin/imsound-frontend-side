// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\authRequestHandler.js

// Обработчик запросов с Authorization Bearer

import { refreshAccessToken } from './refreshAccessToken';
import { sendAuthRequest } from './sendAuthRequest';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/useAuthStore';

async function authRequestHandler(BASE_API_URL, endpoint, method, body = null, headers = {}) {
    const router = useRouter();
    const authStore = useAuthStore();

    if (typeof document !== 'undefined') {
        try {
            const url = BASE_API_URL + endpoint
            const response = await sendAuthRequest(url, method, body, headers);
            console.log(response)
            if (response.status === 401) {
                const refreshResult = await refreshAccessToken(BASE_API_URL);

                if (refreshResult !== 1) {
                    console.log('Токен НЕ обновлен!')
                    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    authStore.setAuthenticated(false);
                    await router.push({ path: '/', query: { showLoginModal: true }});
                    return null;
                } else {
                    console.log('Токен обновлен!')
                    const updatedResponse = await sendAuthRequest(url, method, body, headers);
                    authStore.setAuthenticated(true);
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
}

export default authRequestHandler;