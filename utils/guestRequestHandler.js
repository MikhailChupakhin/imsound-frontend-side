// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\guestRequestHandler.js

import { useRouter } from 'vue-router';
import { useAuthStore } from '@/store/useAuthStore';

async function guestRequestHandler(BASE_API_URL, endpoint, method, body = null, headers = {}) {
    const router = useRouter();
    const authStore = useAuthStore();

    if (typeof document !== 'undefined') {
        try {
            const url = BASE_API_URL + endpoint
            const response = await sendGuestRequest(url, method, body, headers);
            console.log(response)
            return response;
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }
    }
}

export default guestRequestHandler;