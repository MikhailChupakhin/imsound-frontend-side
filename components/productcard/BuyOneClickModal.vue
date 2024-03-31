<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productcard\BuyOneClickModal.vue -->

<template>
    <div v-if="isVisible" class="buyoneclick-modal">
        <div class="modal-content">
            <div class="modal-heading"><strong>Моментальный заказ</strong></div>
            <div class="product-name">{{ productInfo.name }}</div>
            <form class="phone-form">
                <div class="form-group">
                    <input type="text" id="name" v-model="nameUser" placeholder="Ваше имя" required>
                    <input type="text" id="phone" v-model="phoneNumber" placeholder="Введите номер телефона" required>
                    <div class="error-clue" v-if="showErrorClue">Пожалуйста, введите номер телефона в формате <strong>+79123456789</strong> или <strong>89123456789</strong></div>
                </div> 
                <CommonInterfaceButton buttonText="отправить" type="button" @click="handleFormSubmit(productInfo.id, $event)" :customStyle="{ width: '100%' }"/>
            </form>
            <div class="cls-btn">
                <CommonInterfaceButton buttonText="закрыть" @click="closeModal" :customStyle="{ width: '100%' }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { showMessage } from '~/utils/animations/showMessage';

const props = defineProps({
    productInfo: {
        type: Object,
        required: true
    },
    isVisible: Boolean
});


const emits = defineEmits(['close-modal']);
const closeModal = () => {
    emits('close-modal');
};

const showErrorClue = ref(false);
let phoneNumber = '';
let nameUser = '';

const handleFormSubmit = (product_id, event) => {
    const screenWidth = window.innerWidth;
    console.log('screenWidth', screenWidth);
    const x = event.clientX;
    const y = event.clientY;
    submitForm(product_id, screenWidth, x, y);
};

const submitForm = async (product_id, screenWidth, x, y) => {
    const isValid = validatePhoneNumber();
    if (isValid) {
        const config = useRuntimeConfig()
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'buy_one_click/'
        const response = await fetch(`${BASE_API_URL}${endpoint}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: nameUser,
                phone: phoneNumber,
                product: product_id
            })
        });

        if (response.status === 201) {
            const message = 'Отлично,'+nameUser+', скоро перезвоним!';
            let xCoord;
            if (screenWidth < 600) {
                xCoord = 100;
            } else {
                xCoord = x;
            }
            showMessage(message, xCoord, y);
            setTimeout(() => {
                closeModal();
            }, 1000);
        } else {
            const message = 'Произошла ошибка при создании заявки';
            showMessage(message, 100, y);
        }
        
        console.log(response)
    }
};

const validatePhoneNumber = () => {
    const phoneRegex = /^(8|\+7)9\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
        showErrorClue.value = true;
        return false;
    } else {
        showErrorClue.value = false;
        return true;
    }
};
</script>

<style scoped>
.buyoneclick-modal {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal-content {
    background-color: #fff;
    padding: 1rem;
    max-width: 320px;
    max-height: 93%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
}
.modal-heading {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}
.product-name {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}
.phone-form {
    margin-bottom: 0.5rem;
}
.form-group {
    width: 100%;
}
.form-group input[type="text"] {
    border: 0.25px solid #ccc;
    border-radius: 5px;
    text-align: center;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    width: 100%;
    box-sizing: border-box;
}
.error-clue {
    color: red;
    text-align: center;
}
</style>
