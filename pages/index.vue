<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\index.vue -->

<template>
  <MainHeader />
  <IndexSlidersCarousel :sliders="slidersCarouselElements" />
  <div class="main_container">
    <Divider />
    <div v-if="screenWidth > 900">
      <IndexSubcategoriesCarousel :subcategories="subcategoriesCarouselElements" />
    </div>
    <div v-else>
      <IndexSubcategoriesMobile :subcategories="subcategoriesCarouselElements" />
    </div>
    <Divider />
    <IndexSubscriptionEmail />
    <Divider />
    <IndexTextBlock />
  </div>
  <MainFooter />
</template>

<script setup>
import { provide } from 'vue';
import Head from '~/components/common/Head.vue';
import MainHeader from '~/components/header/MainHeader.vue'
import MainFooter from '~/components/footer/MainFooter.vue';
import Divider from 'primevue/divider';
import useSeoData from '~/composables/useSeoData';

import { useBaseStore } from '~/store/baseData';

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'index/';

const baseStore = useBaseStore();

const { data: indexData } = await useAsyncData(
  'indexData',
  () => $fetch(`${BASE_API_URL}${endpoint}`, {
    method: 'GET',
  })
);

const screenWidth = ref(0);

onMounted(() => {
  screenWidth.value = window.innerWidth;
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
  });
});

const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

const slidersCarouselElements = ref();
const subcategoriesCarouselElements = ref();
slidersCarouselElements.value = indexData.value.sliders_carousel;
subcategoriesCarouselElements.value = indexData.value.subcategories_carousel;
provide('featured_products', indexData.value.featured_products);
provide('company_info', indexData.value.company_info);
provide('clients_info', indexData.value.clients_info);

useSeoData(indexData.value.seo_data.title, indexData.value.seo_data.meta_description);

</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
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