// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\guestRequestHandler.js

async function guestRequestHandler(BASE_API_URL, endpoint, method, body = null, headers) {

    try {
        const url = BASE_API_URL + endpoint
        const response = await sendGuestRequest(url, method, body, headers);
        return response;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
}

export default guestRequestHandler;