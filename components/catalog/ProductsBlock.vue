<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
    <div :class="{ 'grid-mode': viewMode === 'grid', 'list-mode': viewMode === 'list' }" class="products_block_container border mt-5">
        <ProductCard v-for="(product, index) in productsList" :key="index" :productInfo="product" />
    </div>
</template>
  
<script>
import { inject, ref, watch } from 'vue';
import ProductCard from './ProductCard.vue';

export default {
  components: {
    ProductCard,
  },
  props: ['viewMode'],
  
  setup() {
    const productsList = inject('products_list');

    return {
      productsList
    };
  }
};
</script>
  
<style scoped>
.products_block_container {
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