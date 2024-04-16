<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\order-success.vue -->

<template>
    <MainHeader />
        <div class="background">
            <p class="text-6xl font-bold">Благодарим за заказ!</p>
            <p class="text-2xl font-bold">Ваш заказ успешно оформлен! Мы свяжемся с Вами в ближайшее время.</p>
            <NuxtLink to="/" class="btn-back">Вернуться на главную</NuxtLink>
        </div>
    <FooterBottom />
</template>

<script setup>
import MainHeader from '~/components/header/MainHeader.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import { useBaseStore } from '~/store/baseData';
import useSeoData from '~/composables/useSeoData';
const baseStore = useBaseStore();
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

const config = useRuntimeConfig();
const BASE_BRANDNAME = config.public.brandName;

useSeoData(`${BASE_BRANDNAME} - благодарим за заказ`, `${BASE_BRANDNAME} - благодарим за заказ`);
</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
}
.background {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-image: url('~/assets/categories.jpg');
    background-size: cover;
    padding: 20px;
    padding-top: 5rem;
    color: white;
}

.footer {
    margin-top: 0;
}

.btn-back {
    margin-top: 20px;
    background-color: var(--blue-500);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
}

.btn-back:hover {
    background-color: #0056b3;
}
</style>