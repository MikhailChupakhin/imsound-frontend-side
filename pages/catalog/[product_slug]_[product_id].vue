<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\[product_slug]_[product_id].vue -->

<template>
  <div>
    <MainHeader />
    <h1>Product Details</h1>
  </div>
</template>
  
<script setup>
import { provide } from 'vue';
import MainHeader from '~/components/header/MainHeader.vue'

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