// C:\Users\user1\VSCProjects\imsound-frontend-side\utils\animations\flyToCart.js   

export function flyToCartAnimation(element, context, xA, yA, xB, yB) {
    const productImgClone = element.cloneNode(true);

    const originalWidth = context.$el.offsetWidth;
    productImgClone.style.width = `${originalWidth / 2}px`;
    productImgClone.style.height = 'auto';

    productImgClone.style.left = `${xA}px`;
    productImgClone.style.top = `${yA}px`;
    productImgClone.style.position = 'fixed';
    const deltaX = xB - xA;
    const deltaY = yB - yA;
    console.log('deltaX', deltaX, 'deltaY', deltaY);

    document.body.appendChild(productImgClone);
    
    setTimeout(() => {
        productImgClone.style.transition = 'transform 1s, opacity 1s, width 1s, height 1s';
        productImgClone.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.5)`;
        productImgClone.style.opacity = '0.5';
        productImgClone.style.width = '10';
        productImgClone.style.height = '10';
        
        setTimeout(() => { 
            productImgClone.remove();
        }, 1000);
    }, 50);
}