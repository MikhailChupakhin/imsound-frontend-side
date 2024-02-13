<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\index.vue -->

<template>
  <div class="main_container">
    <Header />
    <Breadcrumbs />
    <div class="sidebar_container">
      <SidebarNav />
      <div class="content_container">
        <Tags />
        <Sorting />
        <ProductsBlock />
      </div>
    </div>
  </div>
</template>

<script setup>
import { provide } from 'vue';

import Header from '~/components/header/Header.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue';
import SidebarNav from '~/components/catalog/SidebarNav.vue';
import Tags from '~/components/catalog/Tags.vue';
import Sorting from '~/components/catalog/Sorting.vue';
import ProductsBlock from '~/components/catalog/ProductsBlock.vue';

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'catalog/';

const queryParams = useRoute().query
console.log('Query параметры:', queryParams);

const queryString = new URLSearchParams(queryParams).toString();

const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}?${queryString}`)
);

// console.log(data.value.results.categories)
// console.log(data.value.results.subcategories)

provide('categories', data.value.results.categories);
provide('subcategories', data.value.results.subcategories);

provide('breadcrumbs', data.value.results.breadcrumbs);

provide('tags_data', data.value.results.tags_data);
provide('products_quantity', data.value.count);

provide('products_list', data.value.results.product_list);

</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
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