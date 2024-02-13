<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\[product_slug]_[product_id].vue -->

<template>
  <div>
    <Header />
    <h1>Product Details Бля</h1>
    <!-- Здесь можете добавить код для загрузки информации о товаре по его slug и id -->
  </div>
</template>
  
<script setup>
import { provide } from 'vue';
import Header from '~/components/header/Header.vue'

const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = `catalog/${route.params.product_slug}/${route.params.product_id}/`;

const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);

// console.log(data.value.results.categories)
// console.log(data.value.results.subcategories)

provide('categories', data.value.categories);
provide('subcategories', data.value.subcategories);
</script>