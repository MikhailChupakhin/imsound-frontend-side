<template>
      <div class="section-title text-center">Способ получения</div>
      <div v-if="processedDeliveryMethods.length > 0" >
          <div v-for="method in processedDeliveryMethods" :key="method.id" class="flex flex-row justify-content-between flex-wrap p-1">
              <input type="radio" :id="'deliveryMethod' + method.id" :value="method.id" v-model="selectedMethod" @change="handleChange(method)">
              <label :for="'deliveryMethod' + method.id">{{ method.name }}</label>
              <span>{{ formatPrice(method.price) }}</span>
          </div>
      </div>
      <div v-else>
          Загрузка...
      </div>
  
</template>

<script setup>
import { ref } from 'vue';
import CartStore from '~/store/cart.js';
import { formatPrice } from '~/utils/priceFormatter.js';

const props = defineProps({
deliveryMethods: {
  type: Array,
  required: true
}
});

const selectedMethod = ref(null);

const processedDeliveryMethods = computed(() => {
return props.deliveryMethods.map(method => {
  return {
    id: method.id,
    name: method.name,
    price: method.price
  };
});
});

const handleChange = (deliveryMethod) => {
  const { id, name, price } = deliveryMethod;
  CartStore.commit('setDeliveryMethod', { id, name, price });
};

</script>

<style scoped>
.section-title {
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 15px;
} 
</style>