<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\promotional\FeaturedProductCard.vue -->

<template>
  <a :href="getProductDetailURL(product.slug, product.id)">
    <div class="product-image">
      <img :src="BASE_API_MEDIA + product.image" :alt="product.name">
    </div>
    <div class="product-details">
      <h2>{{ product.name }}</h2>
      <div class="product-price">{{ formatPrice(product.total_price) }}</div>
    </div>
  </a>
</template>

<script setup>
import { formatPrice } from '~/utils/priceFormatter.js';
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

function getProductDetailURL(slug, id) {
  return 'catalog/' + slug + '_' + id;
}
</script>
  
<style scoped>
a {
  text-decoration: none;
  color: black;
}
.product-image img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.product-details h2 {
  font-size: 18px;
  margin-bottom: 5px;
  text-align: center;
}

.product-details p {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.product-price {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
}

@media only screen and (max-width: 767px) {
  .product-price {
    border-bottom: 0.25px solid #333;
  }
}
</style>