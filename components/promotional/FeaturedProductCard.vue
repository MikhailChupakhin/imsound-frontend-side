<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\promotional\FeaturedProductCard.vue -->

<template>
    <div>
      <div class="product-image">
        <img :src="'https://imsound.ru' + product.image" :alt="product.name">
      </div>
      <div class="product-details">
        <h2>{{ product.name }}</h2>
        <div class="product-price">{{ product.total_price }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
<style scoped>

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
@media only screen and (max-width: 640px) {
    .product-price {
        border-bottom: 0.25px solid #333;
    }
}
</style>