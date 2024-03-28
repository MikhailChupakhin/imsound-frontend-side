// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\animations\showError.js    

export function showError(message, x, y) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
    errorMessage.style.left = `${x + 30}px`;
    errorMessage.style.top = `${y - 45}px`;
    document.body.appendChild(errorMessage);

    setTimeout(() => {
        errorMessage.classList.add('fade-in');
    }, 10);

    setTimeout(() => {
        errorMessage.classList.remove('fade-in');
        errorMessage.classList.add('fade-out');
    }, 800);

    setTimeout(() => {
        errorMessage.remove();
    }, 1500);
};