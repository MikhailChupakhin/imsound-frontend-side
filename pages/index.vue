<template>
  <MainHeader />
  <IndexSlidersCarousel :sliders="slidersCarouselElements" />
  <div class="main_container">
    <div v-if="screenWidth > 900">
      <IndexSubcategoriesCarousel :subcategories="subcategoriesCarouselElements" />
    </div>
    <div v-else>
      <IndexSubcategoriesMobile :subcategories="subcategoriesCarouselElements" :screenWidth="screenWidth"/>
    </div>
    <Divider />
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3">
        <IndexDiscounts />
      </div>
      <div class="col-12 md:col-6 lg:col-4">
        <IndexNewProducts />
      </div>
      <div class="col-12 md:col-12 lg:col-5">
        <IndexNewProducts />
      </div>
    </div>
    <Divider />
    <IndexFeaturedProductsGrid />
    <Divider />
    <IndexSubscriptionEmail />
    <Divider />
    <IndexFeaturedArticles :articles="indexArticles" />
    <Divider />
    <IndexTextBlock />
  </div>
  <MainFooter />
</template>

<script setup>
import MainHeader from '~/components/header/MainHeader.vue'
import MainFooter from '~/components/footer/MainFooter.vue';
import Divider from 'primevue/divider';
import useSeoData from '~/composables/useSeoData';

import { useBaseStore } from '~/store/baseData';

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'index/';

const baseStore = useBaseStore();

// const { data: indexData } = await useAsyncData(
//   'indexData',
//   () => $fetch(`${BASE_API_URL}${endpoint}`, {
//     method: 'GET',
//   })
// );
const { data: indexData, error } = await useAsyncData(
  'indexData',
  async () => {
    try {
      const response = await $fetch(`${BASE_API_URL}${endpoint}`, {
        method: 'GET',
      });
      console.log('Response:', response); // Выводим результат запроса
      return response.data;
    } catch (err) {
      console.error('Error fetching data:', err); // Выводим ошибку, если запрос завершается неудачно
      throw err; // Прокидываем ошибку дальше для обработки
    }
  }
);

if (error) {
  console.error('Error in useAsyncData:', error); // Обработка ошибок, возникших в процессе получения данных
  // Дальнейшие действия по обработке ошибки, если это необходимо
}

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

const indexArticles = ref(indexData.value.index_articles);
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