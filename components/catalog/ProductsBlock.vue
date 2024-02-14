<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
    <p v-bind:viewMode="viewMode">Режим отображения: {{ viewMode }}</p>
    <div :class="{ 'grid-mode': viewMode === 'grid', 'list-mode': viewMode === 'list' }" class="products_block_container mt-5">
        <ProductCard v-for="(product, index) in products_list" :key="index" :productInfo="product" />
    </div>
</template>
  
<script>
import ProductCard from './ProductCard.vue';

export default {
    components: {
    ProductCard,
  },
  props: ['viewMode'],
  inject: ['products_list'],
};
console.log('products_list')
</script>
  
<style scoped>
.products_block_container {
    border: 1px solid black;
    display: flex;
    flex-wrap: wrap;
}
.grid-mode .product-card {
    width: 33.33%;
}

.list-mode .product-card {
    width: 100%;
}

</style>