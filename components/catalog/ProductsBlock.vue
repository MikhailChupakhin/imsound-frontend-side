<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
  <div :class="{ 'grid-mode': viewMode === 'grid', 'list-mode': viewMode === 'list' }" class="products_block_container border-1 border-round-sm surface-border mt-2">
    <ProductCard v-for="(product, index) in productsList" :key="index" :productInfo="product" :open-quickview-modal="openQuickviewModal" :is-authenticated="isAuthenticated" />
    <QuickviewModal v-if="showQuickviewModal" :productInfo="quickviewProduct" :is-visible="showQuickviewModal" @close-modal="closeQuickviewModal" />
  </div>
</template>
  
<script setup>
import { ref, inject } from 'vue';

import ProductCard from './ProductCard.vue';
import QuickviewModal from '~/components/productcard/QuickviewModal.vue';

import { useAuthStore } from '~/store/useAuthStore';
const authData = useAuthStore();
const isAuthenticated = ref(authData.isAuthenticated);

const productsList = inject('products_list');
const { viewMode } = defineProps({ viewMode: String });

const showQuickviewModal = ref(false);
const quickviewProduct = ref(null);

const openQuickviewModal = (data) => {
  quickviewProduct.value = data;
  showQuickviewModal.value = true;
};

const closeQuickviewModal = () => {
  showQuickviewModal.value = false;
};
</script>
  
<style scoped>
.products_block_container {
    display: flex;
    flex-wrap: wrap;
}
.grid-mode .product-card {
    width: 33.33%;
}
@media screen and (max-width: 767px) {
    .grid-mode .product-card {
        width: 50%;
    }
}
.list-mode .product-card {
    width: 100%;
}

</style>