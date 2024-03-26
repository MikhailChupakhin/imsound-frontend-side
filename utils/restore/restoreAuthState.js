// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\restore\restoreAuthState.js

import { useAuthStore } from '@/store/useAuthStore';

function getAuthTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'accessToken') {
            return 1;
        }
    }
    return null;
}


function restoreAuthStateFromCookie(authStore) {
    console.log('Restoring Auth...')
    const checkAuthToken = getAuthTokenFromCookie();
    if (checkAuthToken) {
        authStore.setAuthenticated(true);
    } else {
        authStore.setAuthenticated(false);
    }
}

export { restoreAuthStateFromCookie };