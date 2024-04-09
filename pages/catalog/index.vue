<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\index.vue -->

<template>
  <div class="main_container">
    <MainHeader />
    <BreadcrumbsNav />
    <div class="content-wrapper grid">
      <SidebarBuiltin />
      <div class="content-area col-10">
        <TagsCloud :linkPath="'/catalog/tags/'" />
        <CatalogModalFilters />
        <CatalogSorting :viewMode="viewMode" @update:viewMode="updateViewMode" />
        <ProductsBlock :viewMode="viewMode" />
        <PaginationBar />
      </div>
    </div>
    <FooterBottom />
  </div>
</template>

<script setup>
import { provide } from 'vue';
import { useBaseStore } from '~/store/baseData';
import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import TagsCloud from '~/components/common/TagsCloud.vue';
import CatalogSorting from '~/components/catalog/CatalogSorting.vue';
import ProductsBlock from '~/components/catalog/ProductsBlock.vue';
import PaginationBar from '~/components/common/PaginationBar.vue';
import SidebarBuiltin from '~/components/catalog/SidebarBuiltin.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import CatalogModalFilters from '~/components/catalog/CatalogModalFilters.vue';
import useSeoData from '~/composables/useSeoData';

const baseStore = useBaseStore();

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'catalog/';

const queryParams = useRoute().query
const queryString = new URLSearchParams(queryParams).toString();

const paginationParam = 12;
const { data: catalogData } = await useAsyncData(
  'catalogData',
  () => $fetch(`${BASE_API_URL}${endpoint}?${queryString}`, {
    method: 'GET',
    headers: {
      'PAGINATIONPARAM': paginationParam,
    }
  })
);

const viewMode = ref('grid');
provide('viewMode', viewMode)
const updateViewMode = (mode) => {
  viewMode.value = mode;
};

const productsList = ref(catalogData.value.results.product_list);
provide('products_list', productsList);

const productsQuantity = ref(catalogData.value.count);
provide('products_quantity', productsQuantity);

const selectedRowsPerPage = ref(12);
provide('selectedRowsPerPage', selectedRowsPerPage);

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

const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

provide('manufacturers', catalogData.value.results.manufacturers);
provide('price_interval', catalogData.value.results.price_interval);
provide('breadcrumbs', catalogData.value.results.breadcrumbs);
provide('tags_data', catalogData.value.results.tags_data);

provide('page_next', catalogData.value.next);
provide('page_previous', catalogData.value.previous);

provide('company_info', catalogData.value.company_info);
provide('clients_info', catalogData.value.clients_info);

useSeoData(catalogData.value.results.seo_data.title, catalogData.value.results.seo_data.meta_description);
</script>

<style scoped>
.main_container {
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  margin-left: 0.9rem;
  margin-right: 0.9rem;
  padding-top: 0.2rem;
}

.content-area {
  flex: 1;
  padding: 0px;
}
</style>
