<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\tags\[tag_slug].vue -->

<template>
    <div v-if="requestDataSuccessful" class="main_container">
        <MainHeader />
        <BreadcrumbsNav />
        <div class="content-wrapper grid">
            <SidebarBuiltin />
            <div class="content-area col-10">
                <TagsCloud :linkPath="'/catalog/tags/'" :activeTag="activeTag" />
                <CatalogModalFilters />
                <CatalogSorting @update:viewMode="updateViewMode" />
                <ProductsBlock :viewMode="viewMode" />
                <PaginationBar />
            </div>
        </div>
        <FooterBottom />
    </div>
</template>

<script setup>
import { useBaseStore } from '~/store/baseData';
import { provide } from 'vue';
import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import TagsCloud from '~/components/common/TagsCloud.vue';
import CatalogSorting from '~/components/catalog/CatalogSorting.vue';
import ProductsBlock from '~/components/catalog/ProductsBlock.vue';
import PaginationBar from '~/components/common/PaginationBar.vue';
import SidebarBuiltin from '~/components/catalog/SidebarBuiltin.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import CatalogModalFilters from '~/components/catalog/CatalogModalFilters.vue';

const baseStore = useBaseStore();
const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter();

const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

const BASE_API_URL = config.public.apiBase;
const endpoint = `catalog/tags/${route.params.tag_slug}/`;
const activeTag = ref(route.params.tag_slug);

const queryParams = useRoute().query
const queryString = new URLSearchParams(queryParams).toString();

const viewMode = ref('grid');
provide('viewMode', viewMode)
const updateViewMode = (mode) => {
    viewMode.value = mode;
};

let requestDataSuccessful = false;

const paginationParam = 12;
let url = `${BASE_API_URL}${endpoint}`;
if (queryString) {
    url += `?${queryString}`;
}

const response = await fetch(url, {
    method: 'GET',
    headers: {
        'PAGINATIONPARAM': paginationParam,
    }
});

if (response.status === 200) {
    const data = await response.json();

    const productsList = ref(data.results.product_list);
    provide('products_list', productsList);

    const productsQuantity = ref(data.count);
    provide('products_quantity', productsQuantity);

    const selectedRowsPerPage = ref(12);
    provide('selectedRowsPerPage', selectedRowsPerPage);

    const APIpath = ref('catalog/');
    provide('APIpath', APIpath);

    const APIqueryString = ref('');
    provide('APIqueryString', APIqueryString);

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

    provide('manufacturers', data.results.manufacturers);
    provide('price_interval', data.results.price_interval);
    provide('breadcrumbs', data.results.breadcrumbs);
    provide('tags_data', data.results.tags_data);

    provide('page_next', data.next);
    provide('page_previous', data.previous);

    provide('company_info', data.company_info);
    provide('clients_info', data.clients_info);
    requestDataSuccessful = true;

    const computedTitle = computed(() => data.results.seo_data.title);
    const computedDescription = computed(() => data.results.seo_data.title);

    useSeoData(computedTitle, computedDescription);
} else {
  console.log('Request failed with status:', response.status);
  router.push('/404')
}
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
}
</style>