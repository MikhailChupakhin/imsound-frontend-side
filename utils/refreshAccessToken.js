// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\refreshAccessToken.js

// Функция обновления токена
export async function refreshAccessToken(BASE_API_URL) {
    try {
        console.log('TOKEN REFRESHING')
        const refresh = getRefreshTokenFromCookie();
        console.log('refreshToken', refresh)
        if (!refresh) {
            return null;
        }
       
        const response = await $fetch(`${BASE_API_URL}token/refresh/`, {
            method: 'POST',
            body: JSON.stringify({ refresh }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.access) {
            console.log('Получен новый access token')
            console.log(response.access);
            // document.cookie = `accessToken=${response.access}; path=/; HttpOnly; Secure`;
            document.cookie = `accessToken=${response.access}; path=/;`;

            return 1;
        } else {
            console.error('Ошибка при обновлении токена:', response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return null;
    }
}

function getRefreshTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        const cookieParts = cookie.split('=');
      
        if (cookieParts[0] === 'refreshToken') {
            return cookieParts[1];
        }
    }
  
    return null;
}