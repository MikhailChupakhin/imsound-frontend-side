<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\promotional\FeaturedProducts.vue

<template>
  <div class="products">
    <div class="p-container">
      <div class="p-grid p-gap-4">
          <div v-for="product in featuredProducts" :key="product.id">
            <div class="product_image">
              <img :src="BASE_API_MEDIA + product.image" :alt="product.name">
            </div>
            <div v-if="product.is_new">
              <a href="#">New</a>
            </div>
            <div class="product_content">
              <div class="product_title">
                <a :href="getProductDetailURL(product.slug, product.id)">
                  {{ product.name }}
                </a>
              </div>
              <div class="product_price">
                {{ product.discount_price ? product.total_price : product.price }} ₽
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, inject } from 'vue';
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const featuredProducts = inject('featured_products', []);

function formatPrice(price) {
  return parseFloat(price).toFixed(2).replace('.', ',');
}

function getProductDetailURL(slug, id) {
  return 'catalog/' + slug + '_' + id;
}

</script>

<style scoped>
.product-image img {
  max-width: 100%;
  height: auto;
}
</style> -->