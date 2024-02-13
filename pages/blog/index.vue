<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\blog\index.vue -->

<template>
    <div class="main_container">
      <p>БЛОГ</p>
      <h1>Данные из API:</h1>
      <pre>{{ data }}</pre>
    </div>
  </template>
  
  <script setup>
  import { provide } from 'vue';
  
  const config = useRuntimeConfig()
  const BASE_API_URL = config.public.apiBase;
  const endpoint = 'blog/';
  
  const queryParams = useRoute().query
  
  const { data } = await useAsyncData(
    'data',
    () => $fetch(`${BASE_API_URL}${endpoint}`)
  );
  
  </script>