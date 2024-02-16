<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductCard.vue -->

<template>
    <div class="product-card border mt-5">
      <img :src="productInfo.image" alt="{{ productInfo.name }} Image"  style="min-width: 230px; max-width: 345px; min-height: 230px; max-height: 345px;">
      <p>{{ productInfo.name }}</p>
      <p>{{ productInfo.total_price }}</p>
    </div>
</template>
  
<script>
  export default {
    props: {
        productInfo: Object
    }
  };
</script>
  
<style scoped>
</style>