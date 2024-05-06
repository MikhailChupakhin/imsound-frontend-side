<template>
<Carousel :value="products" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="5000">
    <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2  p-3">
            <div class="mb-3">
                <div class="relative mx-auto">
                    <img :src="BASE_API_MEDIA + slotProps.data.image" :alt="slotProps.data.name" class="w-full border-round" />
                </div>
            </div>
            <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-content-between align-items-center">
                <div class="mt-0 font-semibold text-xl">{{ formatPrice(slotProps.data.price) }}</div>
                <div v-if="slotProps.data.quantity > 0">
                    <CommonInterfaceButton buttonText="в корзину" @click="addToCart(slotProps.data, $event)"
                    :customStyle="{ 'padding': '0.5rem 1rem !important' }" />
                </div>
                <!-- <span v-if="slotProps.data.quantity > 0">
                    <Button @click="addToCart(slotProps.data)" class="ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        version="1.1"
                        viewBox="0 0 382 468.75"
                        x="0px"
                        y="0px"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        width="20"
                        height="20"
                    >
                        <path class="fil0" d="M171 298c21,0 39,17 39,39 0,21 -18,38 -39,38 -21,0 -39,-17 -39,-38 0,-22 18,-39 39,-39zm0 20c-11,0 -19,8 -19,19 0,10 8,18 19,18 10,0 19,-8 19,-18 0,-11 -9,-19 -19,-19z"/><path class="fil0" d="M292 298c21,0 39,17 39,39 0,21 -18,38 -39,38 -21,0 -39,-17 -39,-38 0,-22 18,-39 39,-39zm0 20c-10,0 -19,8 -19,19 0,10 9,18 19,18 10,0 19,-8 19,-18 0,-11 -9,-19 -19,-19z"/><path class="fil0" d="M11 0l67 15c4,1 6,3 7,7l16 76 273 0c5,0 9,5 8,11l-37 132c-1,4 -4,6 -8,6l-205 0 4 22 198 0c11,0 11,20 0,20l-207 0c-4,0 -8,-3 -9,-7l-51 -249 -60 -13c-12,-3 -7,-22 4,-20zm94 118l22 109 202 0 30 -109 -254 0z"/>
                    </svg>
                    </Button>
                </span> -->
                <CommonInterfaceButton v-else buttonText="предзаказ" @click="openBuyOneClickModal(slotProps.data)"
                :customStyle="{ 'background-color': 'rgb(193, 111, 111)', 'padding': '0.5rem 1rem !important' }" />
            </div>
        </div>
    </template>
</Carousel>  
<BuyOneClickModal v-if="showBuyOneClickModal" :productInfo="buyoneclickProduct"
                                                  :is-visible="showBuyOneClickModal"
                                                  @close-modal="closeBuyOneClickModal" />  
</template>

<script setup>
import Carousel from 'primevue/carousel';
import { formatPrice } from '~/utils/priceFormatter.js';
import { useAuthStore } from '~/store/useAuthStore';
import { flyToCartAnimation } from '~/utils/animations/flyToCart';
import CartStore from '~/store/cart.js';
import BuyOneClickModal from '../productcard/BuyOneClickModal.vue';
const authData = useAuthStore();
const isAuthenticated = ref(authData.isAuthenticated);
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    products: Object,
});

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
];

const addToCart = (productInfo, event) => {
    const xA = event.clientX - 100;
    const yA = event.clientY;
    const cartButton = document.getElementById('cart-button');
    const buttonRect = cartButton.getBoundingClientRect();
    const headerRect = document.querySelector('header').getBoundingClientRect();
    const xB = buttonRect.left + window.scrollX - headerRect.left - 30;
    const yB = buttonRect.top - headerRect.top;
    if (isAuthenticated.value) {
        addToCartAUTH(productInfo, xA, yA, xB, yB);
    } else {
        addToCartGUEST(productInfo, xA, yA, xB, yB);
    }
};

const addToCartAUTH = async (productInfo, xA, yA, xB, yB) => {
    console.log('добавляем в auth корзину', 1)

    const config = useRuntimeConfig();
    const BASE_API_URL = config.public.apiBase;
    const endpoint = 'baskets/add/';

    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        product_id: productInfo.id,
        quantity: 1
    });

    const response = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
    const responseData = await response.json();

    if (responseData.code === 0 || responseData.code === 1) {
        const existingCartItem = CartStore.state.cartItems.find(item => item.productInfo.id === productInfo.id);
        if (existingCartItem) {
            const newQuantity = 1 + existingCartItem.quantity;
            CartStore.commit('updateCartItem', { productInfo, newQuantity });
            console.log('К-во товара в корзине обовлено');
        } else {
            CartStore.commit('addCartItem', { productInfo, quantity: 1 });
            console.log('Товар добавлен в корзину');
        }
        const productImg = document.querySelector('.main-image');
        const originalWidth = productImg.offsetWidth;
        await flyToCartAnimation(productImg, originalWidth, xA, yA, xB, yB);
    } else if (responseData.code === 2) {
        console.log(responseData.message);
    }
}
const addToCartGUEST = async (productInfo, xA, yA, xB, yB) => {
    console.log('добавляем в гостевую корзину', 1)
    const config = useRuntimeConfig();
    const BASE_API_URL = config.public.apiBase;
    const endpoint = 'baskets/add-guest/';

    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        product_id: productInfo.id,
        quantity: 1
    });

    const response = await guestRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
    const responseData = await response.json();

    if (responseData.code === 0 || responseData.code === 1) {
        const existingCartItem = CartStore.state.cartItems.find(item => item.productInfo.id === productInfo.id);
        if (existingCartItem) {
            const newQuantity = 1 + existingCartItem.quantity;
            CartStore.commit('updateCartItem', { productInfo, newQuantity });
            console.log('К-во товара в корзине обовлено');
        } else {
            CartStore.commit('addCartItem', { productInfo, quantity: 1 });
            console.log('Товар добавлен в корзину');
        }
        const productImg = document.querySelector('.main-image');
        const originalWidth = productImg.offsetWidth;
        await flyToCartAnimation(productImg, originalWidth, xA, yA, xB, yB);
    } else if (responseData.code === 2) {
        console.log(responseData.message);
    }
}

const showBuyOneClickModal = ref(false);
const buyoneclickProduct = ref(null);

const openBuyOneClickModal = (data) => {
  buyoneclickProduct.value = data;
  showBuyOneClickModal.value = true;
  document.body.classList.add('body-locked');
};
const closeBuyOneClickModal = () => {
  showBuyOneClickModal.value = false;
  document.body.classList.remove('body-locked');
};
</script>

<style scoped>

</style>

<style>
.p-button {
  background: rgba(246, 160, 23);
  border: 1px solid gray;
  border-radius: 10px;
}
</style>