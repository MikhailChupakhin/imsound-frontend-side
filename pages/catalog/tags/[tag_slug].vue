<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\tag\[tag_slug].vue -->

<template>
    <div class="main_container">
        <MainHeader />
        <BreadcrumbsNav />
        <div class="sidebar_container">
            <SidebarNav />
            <div class="content_container">
                <CatalogTags />
                <CatalogSorting  @update:viewMode="updateViewMode" />
                <ProductsBlock :viewMode="viewMode" />
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { provide } from 'vue';

import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import SidebarNav from '~/components/catalog/SidebarNav.vue';
import CatalogTags from '~/components/catalog/CatalogTags.vue';
import CatalogSorting from '~/components/catalog/CatalogSorting.vue';
import ProductsBlock from '~/components/catalog/ProductsBlock.vue';

const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = `tags/${route.params.tag_slug}/`;

const queryParams = useRoute().query
console.log('Query параметры:', queryParams);

const queryString = new URLSearchParams(queryParams).toString();

const { data } = await useAsyncData(
    'data',
    () => $fetch(`${BASE_API_URL}${endpoint}?${queryString}`)
);

const viewMode = ref('grid');
const updateViewMode = (mode) => {
  viewMode.value = mode;
};

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