<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\promotional\FeaturedProductsGrid.vue -->

<template>
    <h2>Популярные товары</h2>
    <div class="grid">
        <div class="lg:col-3 md:col-6 sm:col-6" v-for="product in products" :key="product.id">
            <FeaturedProductCard :product="product" />
        </div>
    </div>
</template>

<script>
import FeaturedProductCard from './FeaturedProductCard.vue';

export default {
    components: {
        FeaturedProductCard
    },
    setup() {
        const products = inject('featured_products');
        
        return {
            products
        };
    }
};
</script>
  
<style scoped>
</style>