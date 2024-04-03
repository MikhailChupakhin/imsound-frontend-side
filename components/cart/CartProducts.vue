<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\cart\CartProducts.vue     -->

<template>
      <DataTable :value="computedCartItems" tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex flex-wrap align-items-center justify-content-between gap-2">
            <span class="text-xl text-900 font-bold">Товары</span>
          </div>
        </template>
        <Column field="product.image" header="Изображение">
          <template #body="slotProps">
            <img :src="BASE_API_MEDIA + slotProps.data.product.image" :alt="slotProps.data.product.name" class="w-6rem border-round" />
          </template>
        </Column>
        <Column field="product.name" header="Наименование"></Column>
        <Column field="product.total_price" header="Стоимость">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.product.total_price) }}
          </template>
        </Column>
        <Column header="Количество" class="text-center">

          <template #body="slotProps">
            <QuantityInCart :key="slotProps.data.product.id" :initialQuantity="slotProps.data.quantity" :product-id="slotProps.data.product.id"
              :max-value="100" @quantity-change="updateSumm(slotProps.data, $event)"
              @update-item="updateItem(slotProps.data, $event)" />
          </template>
        </Column>
        <Column field="summ" header="Сумма">
          <template #body="slotProps">
            {{ formatPrice(slotProps.data.summ) }}
          </template>
        </Column>
        <Column field="delete" header="Удалить">

          <template #body="slotProps">
            <span :key="slotProps.data.product.id" @click="deleteItem(slotProps.data, isAuthenticated)" class="delete-button"><svg class="mt-1 delete_icon" width="20"
                height="20" id="Layer_1" style="enable-background:new 0 0 128 128;" version="1.1" viewBox="0 0 128 128"
                xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <circle class="st0" cx="64" cy="64" r="64" />
                <path class="st1"
                  d="M100.3,90.4L73.9,64l26.3-26.4c0.4-0.4,0.4-1,0-1.4l-8.5-8.5c-0.4-0.4-1-0.4-1.4,0L64,54.1L37.7,27.8  c-0.4-0.4-1-0.4-1.4,0l-8.5,8.5c-0.4,0.4-0.4,1,0,1.4L54,64L27.7,90.3c-0.4,0.4-0.4,1,0,1.4l8.5,8.5c0.4,0.4,1.1,0.4,1.4,0L64,73.9  l26.3,26.3c0.4,0.4,1.1,0.4,1.5,0.1l8.5-8.5C100.7,91.4,100.7,90.8,100.3,90.4z" />
              </svg></span>
          </template>
        </Column>

        <template #footer>
          <div class="flex justify-content-around flex-wrap ml-5">
            Всего {{ computedSummCartItems }} {{ pluralize(computedSummCartItems, ['товар', 'товара', 'товаров'])}} 
            <div>Общая стоимость: {{ formatPrice(cartItemsTotalPrice) }}</div>
          </div>
        </template>
      </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import QuantityInCart from '~/components/cart/QuantityInCart.vue';
import authRequestHandler from '@/utils/authRequestHandler';
import { formatPrice } from '~/utils/priceFormatter.js';
import CartStore from '~/store/cart.js';

const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  },
  onDeleteItem: {
    type: Function,
    required: true
  },
  isAuthenticated: {
    type: Boolean,
  }
});

const computedCartItems = computed(() => {
  return props.cartItems.map(item => {
    const summ = item.quantity * item.product.total_price;
    return reactive({
      ...item,
      summ: summ
    });
  });
});

const updateSumm = (item, responseData) => {
  item.quantity = responseData.quantity;
  item.summ = item.quantity * item.product.total_price;
};

const updateItem = (item, data) => {
  const itemToUpdate = computedCartItems.value.find(cartItem => cartItem.product.id === data.productId);
  if (itemToUpdate) {
    itemToUpdate.quantity = data.quantity;
    CartStore.commit('updateCartItem', { productInfo: itemToUpdate.product, quantity: itemToUpdate.quantity });
  } else {
    console.error(`Product not found in cartItems.`);
  }
};

const computedSummCartItems = computed(() => {
  let sum = 0;
  computedCartItems.value.forEach(item => {
    sum += item.quantity;
  });
  return sum;
});

const cartItemsTotalPrice = computed(() => {
  let totalPrice = 0;

  computedCartItems.value.forEach(item => {
    totalPrice += item.product.total_price * item.quantity;
  });
  CartStore.commit('updateTotalPrice', totalPrice);
  return totalPrice;
});

const deleteItem = (item, isAuthenticated) => {
  const config = useRuntimeConfig();
  const BASE_API_URL = config.public.apiBase;
  if (isAuthenticated) {
    const endpoint = 'users/cart/remove/';
    if (process.client) {
      (async () => {
        const body = JSON.stringify({ 'product_id': item.product.id });
        const headers = {
          'Content-Type': 'application/json'
        };
        const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
        const responseData = await apiResponse.json();
        if (responseData.success === true) {
          props.onDeleteItem(item);
          CartStore.commit('removeCartItem', item.product.id);
        }
      })();
    }
  } else {
    const endpoint = 'users/cart-guest/remove/';
    if (process.client) {
      (async () => {
        const body = JSON.stringify({ 'product_id': item.product.id });
        const headers = {
          'Content-Type': 'application/json'
        };
        const apiResponse = await guestRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
        const responseData = await apiResponse.json();
        if (responseData.success === true) {
          props.onDeleteItem(item);
          CartStore.commit('removeCartItem', item.product.id);
        }
      })();
    }
  }
};

const handleUpdateItem = (item, newQuantity) => {
  updateItem(itemToUpdate, newQuantity);
  CartStore.commit('updateCartItem', { itemToUpdate, newQuantity});
};

const pluralize = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[Math.min(number % 10, 5)]];
};

</script>

<style scoped>
.delete_icon .st0 {
  fill: #C93636;
}

.delete_icon .st1 {
  fill: #FFFFFF;
}
</style>

<style>
.p-datatable-wrapper {
  overflow: scroll;
  scrollbar-width: thin;
  scrollbar-color: #b51a1a transparent;
}
</style>