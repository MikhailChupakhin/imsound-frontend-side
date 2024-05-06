<template>
    <div class="unvisible-filters mt-2">
        <CommonInterfaceButton buttonText="фильтрация" @click="showMenu = !showMenu" :customStyle="{ width: '100%' }" />
        <div class="products_quantity">
            <strong>{{ pluralize(productsQuantity, 'товар') }}</strong>
        </div>
        <div v-show="showMenu" class="menu-container-expanded">
            <div class="menu bg-white shadow-md z-10">
                <div @click="showMenu = !showMenu" class="auth-menu-close" role="button" tabindex="0" aria-label="Закрыть меню">закрыть меню</div>
                <LazyCatalogFilters v-if="showMenu === true" sliderId="'priceSliderAside'" :closeMenu="closeMenu" />
            </div>
        </div>
    </div>
</template>

<script setup>
// import { onMounted, ref, defineAsyncComponent } from 'vue';
// import CatalogFilters from './CatalogFIlters.vue';
const LazyCatalogFilters = defineAsyncComponent(() =>
  import('./CatalogFilters.vue')
);
import pluralize from '~/utils/func/pluralize.js';

const showMenu = ref(false);
const productsQuantity = inject('products_quantity');

const closeMenu = () => {
    showMenu.value = false;
}

watch(showMenu, (value) => {
    if (value) {
        document.body.classList.add('body-locked');
    } else {
        document.body.classList.remove('body-locked');
    }
});
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.auth-menu-close:hover {
  background-color: #f0f0f0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>