<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\index.vue -->

<template>
  <MainHeader />
  <div class="main_container">
    <PromotionalSlidersCarousel :sliders="sliders" />
    <PromotionalBannersTop :banners_top="banners_top"/>
    <PromotionalFeaturedProductsGrid />
    <IndexSubscriptionEmail />
  </div>
  <MainFooter />
</template>

<script setup>
import { provide } from 'vue';
import MainHeader from '~/components/header/MainHeader.vue'
import MainFooter from '~/components/footer/MainFooter.vue';

import { useBaseStore } from '~/store/baseData';

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'index/';

const baseStore = useBaseStore();

const { data: indexData } = await useAsyncData(
  'indexData',
  () => $fetch(`${BASE_API_URL}${endpoint}`, {
    method: 'GET',
  })
);

console.log('Loading baseData in Index')
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

const sliders = indexData.value.sliders_and_banners.sliders;
const banners_top = indexData.value.sliders_and_banners.banners;
provide('featured_products', indexData.value.featured_products);
provide('company_info', indexData.value.company_info);
provide('clients_info', indexData.value.clients_info);
</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
}

.sidebar_container {
  display: flex;
  flex: 1;
}

.content_container {
  width: 100%;
  margin-left: 20px;
}
</style>