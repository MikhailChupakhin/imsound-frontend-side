<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\promotional\FeaturedProducts.vue -->

<template>
    <div class="products">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="product in featuredProducts" :key="product.id" class="product">
            <div class="product_image">
              <img :src="'https://imsound.ru' + product.image" :alt="product.name">
            </div>
            <div v-if="product.is_new" class="product_extra product_new">
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

const featuredProducts = inject('featured_products', []);

function formatPrice(price) {
  return parseFloat(price).toFixed(2).replace('.', ',');
}

// Функция для получения URL детальной страницы продукта
function getProductDetailURL(slug, id) {
  return 'catalog/' + slug + '_' + id;
}

</script>

<style scoped></style>