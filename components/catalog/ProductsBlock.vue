<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
    <div class="products_block_container mt-5">
        <ProductCard v-for="(product, index) in products_list" :key="index" :productInfo="product" />
    </div>
</template>
  
<script>
import ProductCard from './ProductCard.vue';

export default {
    components: {
    ProductCard,
  },
  inject: ['products_list'],
};
console.log('products_list')
</script>
  
<style scoped>
.products_block_container {
    border: 1px solid black;
}
</style>