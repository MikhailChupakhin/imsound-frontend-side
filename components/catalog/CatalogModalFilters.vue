<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogModalFilters.vue -->

<template>
    <div class="unvisible-filters mt-2">
        <CommonInterfaceButton buttonText="фильтрация" @click="showMenu = !showMenu" :customStyle="{ width: '100%' }" />
        <div class="products_quantity">
            <strong>{{ productsQuantity }}</strong> {{ pluralize(productsQuantity, 'товар') }}
        </div>
        <div v-show="showMenu" class="menu-container-expanded">
            <div class="menu bg-white shadow-md z-10">
                <CatalogFilters sliderId="'priceSliderAside'"/>
                <a @click="showMenu = !showMenu" class="auth-menu-close">Закрыть меню</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CatalogFilters from './CatalogFIlters.vue';
import pluralize from '~/utils/func/pluralize.js';

const showMenu = ref(false);
const productsQuantity = inject('products_quantity');
</script>

<style scoped>
.products_quantity {
    white-space: nowrap;
    display: inline-block;
    padding-right: 1rem;
}
.filter-button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.menu-container-expanded {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 100;
}
.menu {
    width: 20rem;
    background-color: white;
    border-radius: 1.5rem;
    padding: 1.5rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.auth-menu-close {
  display: block;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  text-align: center;
  cursor: pointer;
}
.auth-menu-close:hover {
  background-color: #f0f0f0;
}
</style>