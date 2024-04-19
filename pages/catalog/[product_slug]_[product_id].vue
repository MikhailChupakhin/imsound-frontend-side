<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\[product_slug]_[product_id].vue -->

<template>
  <div class="main_container" v-if="productData">
    <MainHeader />
    <div class="content-wrapper grid">
      <BreadcrumbsNav />
      <div class="content-area col-10">
        <div class="grid">
          <div class="col-12 md:col-6 lg:col-6">
            <ProductImages :image="productData.product.image" :additImages="productData.additional_images_data" />
          </div>
          <div class="col-12 md:col-6 lg:col-6">
            <ProductDetailsActions :productInfo="productData.product" :productChars="productData.characteristics"
              :productRating="productData.average_rating" :additImages="productData.additional_images_data" />
          </div>
          <div class="col-12">
            <ProductDescrReviews :productDescr="productData.product.description"
              :productReviews="productData.reviews" :productChars="productData.characteristics" />
          </div>
          <div class="col-12">
            <ProductCarousel :products="productData.recommended_products" />
          </div>
          <div class="col-12">
            <ProductCallMe />
          </div>
        </div>
      </div>
    </div>
    <FooterBottom /> 
  </div>
  
</template>

<script setup>
import { useBaseStore } from '~/store/baseData';
import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';

import ProductImages from '~/components/productdetails/ProductImages.vue'
import ProductDetailsActions from '~/components/productdetails/ProductDetailsActions.vue'
import ProductDescrReviews from '~/components/productdetails/ProductDescrReviews.vue'
import ProductCarousel from '~/components/productdetails/ProductCarousel.vue'
import ProductCallMe from '~/components/productdetails/ProductCallMe.vue';
import { useRouter } from 'vue-router';
import { formatPrice } from '~/utils/priceFormatter.js';
import useSeoData from '~/composables/useSeoData';

const baseStore = useBaseStore();

const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = `catalog/${route.params.product_slug}/${route.params.product_id}/`;

const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

const { data: productData, error, status } = await useAsyncData(
  'productData',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);

const router = useRouter();
if (status.value == 'success') {
  provide('breadcrumbs', productData.value.breadcrumbs);
  
  useSeoData(productData.value.seo_data.title, productData.value.seo_data.meta_description);
} else if (status.value == 'error') {
  console.error("Произошла ошибка при загрузке данных:", error);
  router.push('/404');
}

</script>

<style scoped>
.main_container {
  overflow-x: hidden;
  width:100%;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  display: flex;
  width: 95%;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  margin:auto;
  padding-top: 0.2rem;
}

.content-area {
  flex: 1;
  padding: 0px;
}
</style>
