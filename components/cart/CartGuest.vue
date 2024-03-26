
<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\cart\CartGuest.vue -->
    
<template>
    <div>{{ cartItems }}</div>
    <div>{{ deliveryMethods }}</div>
    <div></div>
</template>
  
<script setup>
import { provide, ref, onMounted } from 'vue';
import guestRequestHandler from '@/utils/guestRequestHandler';

const response = ref(null);
const cartItems = ref(null);
const deliveryMethods = ref(null);

onMounted(async () => {
    try {
        const config = useRuntimeConfig();
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'users/cart_guest/';
        const apiResponse = await guestRequestHandler(BASE_API_URL, endpoint, 'GET');
        response.value = await apiResponse.json();

        cartItems.value = await response.value.cart_items;
        deliveryMethods.value = await response.value.delivery_methods;

        console.log('cartItems', cartItems)
        console.log('deliveryMethods', deliveryMethods)
    } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
    }
});

</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
}
</style>