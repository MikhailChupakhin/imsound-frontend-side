<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductCard.vue -->

<template>
    <div class="product-card border text-center">
      <img :src="productInfo.image" alt="{{ productInfo.name }} Image"  style="min-width: 230px; max-width: 345px; min-height: 230px; max-height: 345px;">
      <h2><a>{{ productInfo.name }}</a></h2>
      <div class="total-price"><a>{{ productInfo.total_price }}</a></div>
      <QuantityVue />
    </div>
</template>
  
<script>
  import QuantityVue from '~/components/product_card/Quantity.vue';


  export default {
    props: {
        productInfo: Object
    },
    components: { QuantityVue }
};
</script>
  
<style scoped>
h2 a {
    line-height: 20px;
    display: block;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 20px;
    color: #272727;
    text-transform: capitalize;
}

.total-price {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 15px;
}
</style>