<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productcard\QuickviewModal.vue -->

<template>
    <div v-if="isVisible" class="quickview-modal">
        <div class="modal-content">
            <div class="modal-header text-center">Быстрый просмотр {{ productInfo.product.name }}</div>
            <div class="view-btn">
                <CommonInterfaceButton buttonText="Переключиться" @click="toggleView" />
            </div>
            <div class="grid mt-1 mb-3">
                <div class="col-12 md:col-4 lg:col-4">
                    <img class="modal-image" :src="BASE_API_MEDIA + productInfo.product.image">
                </div>
                <div class="col-12 md:col-4 lg:col-4" v-if="showDescription || isWideScreen">
                    <div class="flex">
                        <div class="col-6 font-bold">Цена:</div>
                        <div class="col-6 text-right font-bold">{{ formatPrice(productInfo.product.total_price) }}</div>
                    </div>
                    <div class="text-center font-bold mb-1">Описание товара:</div>
                    <div class="modal-descr">
                        <p v-if="!productInfo.product.description" class="text-center">Товару не добавлено описание</p>
                        <p v-else v-html="productInfo.product.description"></p>
                    </div>
                </div>
                <div class="col-12 md:col-4 lg:col-4" v-if="!showDescription || isWideScreen">
                    <div class="text-center font-bold">Характеристики:</div>
                    <div class="modal-characteristics">
                        <p v-if="productInfo.product.characteristics.length === 0" class="text-center">Товару не добавлено характеристик</p>
                        <table class="characteristics-table">
                            <tbody>
                                <tr v-for="characteristic in productInfo.product.characteristics" :key="characteristic.id">
                                    <td>{{ characteristic.name }}</td>
                                    <td>{{ characteristic.value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="cls-btn">
                <CommonInterfaceButton buttonText="Закрыть" @click="closeModal" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { formatPrice } from '~/utils/priceFormatter.js';
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    productInfo: {
        type: Object,
        required: true
    },
    isVisible: Boolean
});

const emits = defineEmits(['close-modal']);

const showDescription = ref(true);
const isWideScreen = ref(window.innerWidth > 768);

const closeModal = () => {
    emits('close-modal');
};
const toggleView = () => {
    showDescription.value = !showDescription.value;
};

window.addEventListener('resize', () => {
    isWideScreen.value = window.innerWidth > 768;
});
</script>

<style scoped>
.quickview-modal {
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
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-height: 93%;
    display: flex;
    flex-direction: column;
    position: relative;
}
@media screen and (max-width: 768px) {
    .modal-content {
        height: 580px;
    }
}
.modal-header {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 10px;
}
.modal-image {
    max-width: 95%;
    height: auto;
}
@media screen and (max-width: 768px) {
    .modal-image {
        display: none;
    }
}
.modal-descr {
    margin-bottom: 10px;
    height: 350px;
    overflow-y: auto;
    margin-bottom: 1rem;
}
.modal-characteristics {
    margin-bottom: 10px;
    height: 350px;
    overflow-y: auto;
}

.characteristics-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}
.characteristics-table td {
    padding: 8px;
    border: 1px solid #ddd;
}
.characteristics-table td:first-child {
    font-weight: bold;
    width: 40%;
}
.cls-btn {
    width: fit-content;
    padding: 5px;
    margin-top: 1.5rem;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
.view-btn {
  margin-top: 10px;
  margin: 0 auto;
}
@media screen and (min-width: 769px) {
    .view-btn {
        display: none;
    }
}
</style>