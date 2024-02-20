<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\index.vue -->

<template>
  <div class="main_container">
    <MainHeader />
    <BreadcrumbsNav />
    <div class="content_area">
      <div class="sidebar_container">
        <SidebarNav />
        <CatalogFIlters />
      </div>
      <div class="content_container">
        <CatalogTags />
        <CatalogSorting @update:viewMode="updateViewMode" />
        <ProductsBlock :viewMode="viewMode" />
        <PaginationBar />
      </div>
    </div>
  </div>
</template>

<script setup>
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import { provide } from 'vue';

import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import SidebarNav from '~/components/catalog/SidebarNav.vue';
import CatalogFIlters from '~/components/catalog/CatalogFIlters.vue';
import CatalogTags from '~/components/catalog/CatalogTags.vue';
import CatalogSorting from '~/components/catalog/CatalogSorting.vue';
import ProductsBlock from '~/components/catalog/ProductsBlock.vue';
import PaginationBar from '~/components/common/PaginationBar.vue';

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'catalog/';

const queryParams = useRoute().query
const queryString = new URLSearchParams(queryParams).toString();

const paginationParam = 9;
const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}?${queryString}`, {
    method: 'GET',
    headers: {
      'PAGINATIONPARAM': paginationParam,
    }
  })
);

const viewMode = ref('grid');
const updateViewMode = (mode) => {
  viewMode.value = mode;
};

const productsList = ref(data.value.results.product_list);
provide('products_list', productsList);

const productsQuantity = ref(data.value.count);
provide('products_quantity', productsQuantity);

const APIpath = ref('catalog/');
provide('APIpath', APIpath);
const APIqueryString = ref('');
provide('APIqueryString', APIqueryString)

const minPrice = ref('');
const maxPrice = ref('');
const inStock = ref(false);
const selectedManufacturers = ref([]);

provide('minPrice', minPrice);
provide('maxPrice', maxPrice);
provide('inStock', inStock);
provide('selectedManufacturers', selectedManufacturers);

const sortingOption = ref('');
provide('sortingOption', sortingOption);

const currentPage = ref('1');
provide('currentPage', currentPage);

provide('categories', data.value.results.categories);
provide('subcategories', data.value.results.subcategories);
provide('manufacturers', data.value.results.manufacturers);
provide('price_interval', data.value.results.price_interval);
provide('breadcrumbs', data.value.results.breadcrumbs);
provide('tags_data', data.value.results.tags_data);

provide('page_next', data.value.next);
provide('page_previous', data.value.previous);

</script>

<style scoped>
.main_container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content_area {
  display: grid;
  grid-template-columns: auto 1fr;
}

.sidebar_container {
  width: 240px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.content_container {
  margin-left: 20px;
}
</style>