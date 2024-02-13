// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\refreshAccessToken.js

// Функция обновления токена
export async function refreshAccessToken(BASE_API_URL) {
    try {
        console.log('TOKEN REFRESHING')
        const refresh = localStorage.getItem('refreshToken');
   
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
            
            localStorage.setItem('accessToken', response.access);

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