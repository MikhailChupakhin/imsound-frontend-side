// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\sendAuthRequest.js

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export async function sendAuthRequest(url, method, body = null, headers) {
    const accessToken = getCookie('accessToken');
    if (method === 'OPTIONS') {
        headers = {};
    } else {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });

        return response;
    } catch (error) {
        console.error('sendAuthRequestError:', error);
    }
}