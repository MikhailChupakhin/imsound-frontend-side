// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\sendGuestRequest.js

export async function sendGuestRequest(url, method, body = null, headers) {
    if (method === 'OPTIONS') {
        headers = {};
    } else {
        let guestToken = localStorage.getItem('guestToken');
        console.log('guestToken', guestToken)
        guestToken = checkExpiredToken(guestToken);
        if (!guestToken) {
            guestToken = generateGuestToken();
        }
        headers['guest-token'] = guestToken.token;
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });

        return response;

    } catch (error) {
        console.error('sendGuestRequestError:', error);
    }
}

function generateGuestToken() {
    const randomString = Array.from({ length: 30 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const currentTime = new Date().getTime();
    const expirationTime = currentTime + 3600000;

    const tokenData = {
        token: randomString,
        expiration: expirationTime
    };

    localStorage.setItem('guestToken', JSON.stringify(tokenData));

    return tokenData;
}

function checkExpiredToken(guestToken) {
    const currentTime = new Date().getTime();

    if (guestToken) {
        guestToken = JSON.parse(guestToken);

        if (currentTime > guestToken.expiration) {
            localStorage.removeItem('guestToken');
            guestToken = null;
        }
    }

    return guestToken;
}