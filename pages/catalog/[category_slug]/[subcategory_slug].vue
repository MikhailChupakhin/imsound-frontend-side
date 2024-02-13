<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\[category_slug]\[subcategory_slug].vue -->

<template>
  <div class="main_container">
    <Header />
    <h1>Данные из API:</h1>
    <pre>{{ data }}</pre>
  </div>
</template>

<script setup>
import { provide } from 'vue';
import Header from '~/components/header/Header.vue'

const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = `catalog/${route.params.category_slug}/${route.params.subcategory_slug}/`;

const queryParams = useRoute().query
console.log('Query параметры:', queryParams);

const queryString = new URLSearchParams(queryParams).toString();

const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}?${queryString}`)
);

provide('categories', data.value.results.categories);
provide('subcategories', data.value.results.subcategories);

</script>