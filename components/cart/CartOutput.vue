<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\cart\CartOutput.vue -->

<template>
  <div class="section-title text-center">Итог</div>
  <div class="costs">
    <div class="cost">
      <span class="label">Стоимость товаров:</span>
      <span class="value">{{ formatPrice(computedCartTotalPrice) }}</span>
    </div>
    <div class="cost">
      <span class="label">Способ получения:</span>
      <span class="value">{{ computedDeliveryMethod.name || 'Ожидает выбора' }}</span>
    </div>
    <div class="cost">
      <span class="label">Стоимость доставки:</span>
      <span class="value">{{ computedDeliveryMethod.price || 'Ожидает выбора' }}</span>
    </div>
    <div class="cost" v-if="computedDeliveryMethod.name">
      <span class="label font-bold">Общая стоимость:</span>
      <span class="value font-bold">{{ formatPrice(parseFloat(computedCartTotalPrice) +
        parseFloat(computedDeliveryMethod.price)) }}</span>
    </div>
    <div class="cost" v-else>
      <span class="label font-bold">Общая стоимость:</span>
      <span class="value font-bold">Выберите доставку</span>
    </div>
    <div v-if="showDeliveryMethodNotSelectedMessage" class="text-center text-red-500 mt-3">
      Сначала выберите способ получения
    </div>
  </div>
  <div class="checkout-button mt-3">
    <ButtonAnimated buttonText="Оформить заказ" :handleClick="handleCheckout" :addClasses="123" />
  </div>
</template>

<script setup>

import { formatPrice } from '~/utils/priceFormatter.js';
import ButtonAnimated from '~/components/common/ButtonAnimated.vue';
import CartStore from '~/store/cart';
import { useAuthStore } from '~/store/useAuthStore';

const router = useRouter();
const route = useRoute();
const authData = useAuthStore();
console.log('Статус аутентификации:', authData.isAuthenticated);

const computedCartTotalPrice = computed(() => {
  return CartStore.getters.getCartTotalPrice;
});

const computedDeliveryMethod = computed(() => {
  const { id, name, price } = CartStore.getters.getDeliveryMethod;
  return { id, name, price }
});

const showDeliveryMethodNotSelectedMessage = ref(false);

const handleCheckout = () => {
  if (!computedDeliveryMethod.value.name) {
    showDeliveryMethodNotSelectedMessage.value = true;
  } else {
    router.push({ 
      path: '/users/checkout-auth',
      query: { deliveryMethod: computedDeliveryMethod.value.id },
      replace: true 
    });
  }
};

CartStore.watch(() => CartStore.getters.getDeliveryMethod, () => {
  showDeliveryMethodNotSelectedMessage.value = false;
});
</script>

<style scoped>

.section-title {
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 15px;
}

.costs {
  display: flex;
  flex-direction: column;
}

.cost {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.value {
  margin-left: auto;
}

.checkout-button {
  height: 4rem;
}
</style>