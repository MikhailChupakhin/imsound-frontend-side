<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\my-orders.vue -->

<template>
    <MainHeader />
    <BreadcrumbsNav />
    <div class="main_container">
        <table v-if="response && response.orders && response.orders.length" class="orders-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Email</th>
                    <th>Город</th>
                    <th>Сумма</th>
                    <th>Дата создания</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in response.orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.first_name }}</td>
                    <td>{{ order.last_name }}</td>
                    <td>{{ order.email }}</td>
                    <td>{{ order.city }}</td>
                    <td>{{ formatPrice(order.total_sum) }}</td>
                    <td>{{ formatDate(order.created) }}</td>
                </tr>
            </tbody>
        </table>
        <div v-else>
            Загрузка...
        </div>
    </div>
    <FooterBottom />
</template>

<script setup>

import MainHeader from '~/components/header/MainHeader.vue';
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import authRequestHandler from '@/utils/authRequestHandler';
import FooterBottom from '~/components/footer/FooterBottom.vue';

import { useBaseStore } from '~/store/baseData';
import { useAuthStore } from '~/store/useAuthStore';
import { formatPrice } from '~/utils/priceFormatter.js';
import { ref } from 'vue';

const baseStore = useBaseStore();
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);
provide('breadcrumbs', [["/", "Главная"], ["/users/my-orders/", "Мои заказы"]]);

const response = ref(null);
const config = useRuntimeConfig();
const BASE_API_URL = config.public.apiBase;
const endpoint = 'orders/my-list/';

if (process.client) {
    (async () => {
        const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'GET');
        response.value = await apiResponse.json();
    })();
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}
</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 1rem;
}
.orders-table {
    margin-top: 1rem;
    border-collapse: collapse;
    width: 100%;
}
.orders-table th, .orders-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.orders-table th {
    background-color: #f2f2f2;
}
</style>