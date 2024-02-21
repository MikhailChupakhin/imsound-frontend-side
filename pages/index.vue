<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\index.vue -->

<template>
  <MainHeader />
  <div class="main_container">
    <PromotionalSlidersCarousel />
    <PromotionalBannersTop />
    <PromotionalFeaturedProductsGrid />
    <IndexSubscriptionEmail />
  </div>
  <MainFooter />
</template>

<script setup>
import { provide } from 'vue';
import MainHeader from '~/components/header/MainHeader.vue'
import MainFooter from '~/components/footer/MainFooter.vue';

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'index/';

const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);


provide('categories', data.value.categories);
provide('subcategories', data.value.subcategories);


provide('sliders', data.value.sliders_and_banners.sliders);
provide('banners_top', data.value.sliders_and_banners.banners);
provide('featured_products', data.value.featured_products);

provide('company_info', data.value.company_info);
provide('clients_info', data.value.clients_info);

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