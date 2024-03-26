// // C:\Users\user1\VSCProjects\imsound-frontend-side\utils\guestTokens.js

// function generateRandomToken(length) {
//     let result = '';
//     const characters = '0123456789abcdef';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }

// // Функция для получения гостевого токена
// function getGuestToken() {
//     if (typeof window !== 'undefined') {
//         const storedToken = localStorage.getItem('guest_token');
//         console.log(storedToken)
//         if (storedToken) {
//             const tokenData = JSON.parse(storedToken);

//             if (Date.now() < tokenData.expiration) {
//                 console.log(tokenData)
//                 return tokenData;
//             }
//         }

//         const expiration = Date.now() + 3600000;
//         const newToken = {
//             token: generateRandomToken(30),
//             expiration: expiration
//         };

//         localStorage.setItem('guest_token', JSON.stringify(newToken));
//         console.log(newToken)
//         return newToken;
//     }
// }

// export { getGuestToken };