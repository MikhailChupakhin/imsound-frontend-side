<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\index.vue -->

<template>
  <div class="main_container">
    <MainHeader />
    <PromotionalSlidersCarousel />
    <PromotionalBannersTop />
    <PromotionalFeaturedProducts/>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import MainHeader from '~/components/header/MainHeader.vue'

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'index/';

const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);

// console.log(data.value.categories)
// console.log(data.value.subcategories)

provide('categories', data.value.categories);
provide('subcategories', data.value.subcategories);

// console.log(data.value.sliders_and_banners.sliders)
provide('sliders', data.value.sliders_and_banners.sliders);

// console.log(data.value.sliders_and_banners.banners)
provide('banners_top', data.value.sliders_and_banners.banners);

// console.log(data.value.featured_products)
provide('featured_products', data.value.featured_products);

</script>

<style scoped>
.main_container {
  padding-left: 10px;
}
</style>