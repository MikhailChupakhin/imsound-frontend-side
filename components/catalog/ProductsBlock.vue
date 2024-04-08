<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
  <div :class="{ 'grid-mode': viewMode === 'grid', 'list-mode': viewMode === 'list' }" class="products-block-container border-1 border-round-sm surface-border mt-2">
    <ProductCard v-for="(product, index) in productsList" :key="index"
                                                          :viewMode="viewMode"
                                                          :productInfo="product"
                                                          :open-quickview-modal="openQuickviewModal"
                                                          :openBuyOneClickModal="openBuyOneClickModal"
                                                          :is-authenticated="isAuthenticated" 
                                                          :cardWidth="cardWidth" />
    <QuickviewModal v-if="showQuickviewModal" :productInfo="quickviewProduct"
                                              :is-visible="showQuickviewModal"
                                              @close-modal="closeQuickviewModal" />
    <BuyOneClickModal v-if="showBuyOneClickModal" :productInfo="buyoneclickProduct"
                                                  :is-visible="showBuyOneClickModal"
                                                  @close-modal="closeBuyOneClickModal" />
    <ComparisonIcon v-if="shouldShowComparisonIcon" />
  </div>
</template>
  
<script setup>
import { ref, inject } from 'vue';

import ProductCard from './ProductCard.vue';
import ComparisonIcon from './ComparisonIcon.vue';
import QuickviewModal from '~/components/productcard/QuickviewModal.vue';
import  comparisonList from '~/store/comparison.js';

import { useAuthStore } from '~/store/useAuthStore';
import BuyOneClickModal from '../productcard/BuyOneClickModal.vue';

const authData = useAuthStore();
const isAuthenticated = ref(authData.isAuthenticated);

const productsList = inject('products_list');
const { viewMode } = defineProps({ viewMode: String });

const showQuickviewModal = ref(false);
const quickviewProduct = ref(null);

const showBuyOneClickModal = ref(false);
const buyoneclickProduct = ref(null);

const openQuickviewModal = (data) => {
  quickviewProduct.value = data;
  showQuickviewModal.value = true;
};

const openBuyOneClickModal = (data) => {
  buyoneclickProduct.value = data;
  showBuyOneClickModal.value = true;
};

const closeQuickviewModal = () => {
  showQuickviewModal.value = false;
};

const closeBuyOneClickModal = () => {
  showBuyOneClickModal.value = false;
};

const comparisonItemsCount = computed(() => comparisonList.getters.getComparisonItems.length);
const shouldShowComparisonIcon = computed(() => comparisonItemsCount.value >= 2);

const cardWidth = ref(null);

onMounted(() => {
  // Расчет ширины карточки ProductCard в зависимости от ширины экрана и стилей
  const screenWidth = window.innerWidth;
  const containerWidth = document.querySelector('.products-block-container').clientWidth;
  const gridMode = viewMode === 'grid';
  
  // Здесь можно реализовать логику расчета ширины карточки в зависимости от gridMode и screenWidth
  // Например, если gridMode, то определенное количество карточек на строку и деление containerWidth на количество карточек
  
  // Пример простого расчета для демонстрации
  const numCardsPerRow = gridMode ? (screenWidth > 767 ? 3 : 2) : 1; // Предполагается, что 3 карточки на строку на больших экранах, 2 на меньших, для режима grid
  cardWidth.value = gridMode ? `${(containerWidth / numCardsPerRow)}px` : '100%'; // Предполагается отступ 10px между карточками
});
</script>
  
<style scoped>
.products-block-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.6rem;
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