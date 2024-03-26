// // C:\Users\user1\VSCProjects\imsound-frontend-side\utils\guestTokensCookie.js

// function generateRandomToken(length) {
//     let result = '';
//     const characters = '0123456789abcdef';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// function getGuestToken() {
//     if (typeof document !== 'undefined') {
//         const cookies = document.cookie.split(';');
//         for (let cookie of cookies) {
//             const [name, value] = cookie.split('=');
//             if (name.trim() === 'guest_token') {
//                 const tokenData = JSON.parse(decodeURIComponent(value));
//                 if (Date.now() < tokenData.expiration) {
//                     return tokenData;
//                 }
//             }
//         }

//         const expiration = Date.now() + 3600000;
//         const newToken = {
//             token: generateRandomToken(30),
//             expiration: expiration
//         };

//         const encodedToken = encodeURIComponent(JSON.stringify(newToken));
//         document.cookie = `guest_token=${encodedToken}; expires=${new Date(expiration).toUTCString()}; path=/`;
//         console.log("newToken", newToken)
//         return newToken;
//     }
// }

// export { getGuestToken };