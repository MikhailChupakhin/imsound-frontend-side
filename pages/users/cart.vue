<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\cart.vue -->

<template>
  <MainHeader />
  <BreadcrumbsNav />
  <div class="main_container" v-show="!isCartEmpty">
    <div>
      <template v-if="!cartItems.length">
        <CartProducts :cartItems="CartItemsStored" :onDeleteItem="deleteItem" :is-authenticated="isAuthenticated" />
      </template>
      <template v-else>
        <CartProducts :cartItems="cartItems" :onDeleteItem="deleteItem" :is-authenticated="isAuthenticated" />
      </template>
    </div>
    <div class="flex justify-content-center flex-wrap">
      <div class="delivery-section grid w-11">
        <div class="flex flex-column justify-content-between col-12 md:col-4 lg:col-4">
          <div>
            <CartDelivery :deliveryMethods="deliveryMethods" />
          </div>
          <div class="mt-3">
            <CartPromocodes />
          </div>
        </div>
        <div class="output-section col-12 md:col-6 md:col-offset-2 lg:col-6 lg:col-offset-2">
          <CartOutput />
        </div>
      </div>
    </div>
  </div>
  <div class="background" v-show="isCartEmpty">
    <p class="text-4xl lg:text-6xl font-bold">Ваша корзина пуста!</p>
    <NuxtLink to="/catalog" class="btn-back">Вернуться к покупкам</NuxtLink>
  </div>
  <FooterBottom />
</template>

<script setup>

import MainHeader from '~/components/header/MainHeader.vue';
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import authRequestHandler from '@/utils/authRequestHandler';
import CartProducts from '~/components/cart/CartProducts.vue';
import CartDelivery from '~/components/cart/CartDelivery.vue';
import CartOutput from '~/components/cart/CartOutput.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';

import { useBaseStore } from '~/store/baseData';
import CartStore from '~/store/cart';

import { useAuthStore } from '~/store/useAuthStore';
const authData = useAuthStore();
const isAuthenticated = ref(authData.isAuthenticated);

const baseStore = useBaseStore();
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);
provide('breadcrumbs', [["/", "Главная"], ["/users/cart/", "Корзина пользователя"]]);

const response = ref(null);
const cartItems = ref([]);
const deliveryMethods = ref([]);
const isCartEmpty = ref(false);

const CartItemsStored = computed(() => {
  const items = CartStore.getters.getCartItems;
  const convertedCartItems = items.map(item => {
    const imageUrl = item.productInfo.image;
    const index = imageUrl.indexOf('/media');
    const trimmedImageUrl = imageUrl.substring(index);
    return {
      product: {
        id: item.productInfo.id,
        name: item.productInfo.name,
        image: trimmedImageUrl,
        total_price: item.productInfo.total_price,
      },
      quantity: item.quantity
    };
  });
  console.log('CartItemsStored', convertedCartItems)
  return convertedCartItems;
});


const config = useRuntimeConfig();
const BASE_API_URL = config.public.apiBase;
const endpoint = 'users/cart/';

if (process.client) {
  (async () => {
    const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'GET');
    response.value = await apiResponse.json();
    cartItems.value = response.value.cart_items;
    if (cartItems.value.length === 0) {
      isCartEmpty.value = true;
    }
    deliveryMethods.value = response.value.delivery_methods;
  })();
}
console.log('cartItems', cartItems)

const deleteItem = (item) => {
  cartItems.value = cartItems.value.filter(cartItem => cartItem.product.id !== item.product.id);
  if (cartItems.value.length === 0) {
    isCartEmpty.value = true;
  }
};

</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 1rem;
}

.output-section {
  margin-top: 1rem;
  background-color: #f2f4f8;
  border-radius: 5px;
}

.background {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: url('~/assets/categories.jpg');
  background-size: cover;
  padding: 20px;
  padding-top: 5rem;
  color: white;
}

.footer {
  margin-top: 0;
}

.btn-back {
  margin-top: 20px;
  background-color: var(--blue-500);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn-back:hover {
  background-color: #0056b3;
}
</style>