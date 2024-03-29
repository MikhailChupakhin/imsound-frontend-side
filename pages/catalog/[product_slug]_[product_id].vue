<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\catalog\[product_slug]_[product_id].vue -->

<template>
  <div class="main_container">
    <MainHeader />
    <BreadcrumbsNav />
    <div class="content-wrapper grid">
      <div class="content-area col-10">
        <pre>{{ data }}</pre>
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

const baseStore = useBaseStore();

const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = `catalog/${route.params.product_slug}/${route.params.product_id}/`;

const { data } = await useAsyncData(
  'data',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);

const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

provide('breadcrumbs', data.value.breadcrumbs);
</script>