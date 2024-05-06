<template>
    <div class="actions-container" :style="{ height: containerHeight }" >
        <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center header-2 font-bold">Производитель</div>
            <div class="flex align-items-center justify-content-center text-2xl">{{ productInfo.manufacturer_name }}</div>
        </div>
        <div class="flex justify-content-between flex-wrap mt-3">
            <div class="flex align-items-center justify-content-center header-2 font-bold">Цена</div>
            <div class="flex align-items-center justify-content-center text-2xl">
                <div v-if="productInfo.discount_percentage > 0">
                    <span class="mr-2" style="color: red; text-decoration: line-through;">{{ formatPrice(visibleUndiscountedPrice) }}</span>
                    <span>{{ formatPrice(visiblePrice) }}</span>
                </div>
                <div v-else>
                    {{ formatPrice(visiblePrice) }}
                </div>
            </div>
        </div>
        <div class="flex justify-content-between flex-wrap mt-3">
            <div class="flex align-items-center justify-content-center">
                <div v-if="productInfo.quantity > 0" class="flex justify-content-center">
                    <QuantityVue :initialQuantity="1" :max-value="productInfo.quantity" @quantity-change="updateQuantity" />
                </div>
                <div v-else class="not-available-text">Нет в наличии</div>
            </div>
            <CommonInterfaceButton class="cart-button" v-if="productInfo.quantity > 0" @click="addToCart($event)" buttonText="в корзину" :customStyle="{ width: '50%' }" />
            <CommonInterfaceButton v-else buttonText="предзаказ" @click="openBuyOneClickModal(productInfo)" :customStyle="{ 'background-color': 'rgb(193, 111, 111)', width: '50%' }" />
        </div>
        <div class="flex justify-content-between flex-wrap mt-3">
            <div class="flex align-items-center justify-content-center text-xl font-bold">Наличие:<span style="color: green; margin-left: 1rem;"> {{ productInfo.quantity }}</span></div>
            <div class="flex align-items-center justify-content-center text-xl font-bold">Артикул: {{ productInfo.article_number }}</div>
        </div>
        <div class="flex justify-content-between flex-wrap mt-3">
            <div class="flex align-items-center justify-content-center text-xl font-bold">Рейтинг</div>
            <div class="flex align-items-center justify-content-center">
                <div v-if="productRating != null">
                    <CommonRatingStars :rating="productRating"/>
                </div>
                <div v-else>
                    еще нет оценок
                </div>
            </div>
        </div>
        <div class="flex justify-content-between flex-wrap product-characteristics-container mt-3">
            <div class="flex justify-content-center text-xl font-bold mb-2">Характеристики</div>
            <template v-if="productChars && productChars.length > 0">
                <table class="product-characteristics-table">
                    <tbody>
                        <tr v-for="(char, index) in productChars" :key="index">
                            <td>{{ char.name }}</td>
                            <td class="text-center">{{ char.value }}</td>
                        </tr>
                    </tbody>
                </table>
            </template>
            <template v-else>
                <div>не добавлены</div>
            </template>
        </div>
    </div>
    <BuyOneClickModal v-if="showBuyOneClickModal" :productInfo="buyoneclickProduct"
                                                  :is-visible="showBuyOneClickModal"
                                                  @close-modal="closeBuyOneClickModal" />
</template>

<script setup>
import QuantityVue from '~/components/productcard/Quantity.vue';
import CartStore from '~/store/cart.js';
import { useAuthStore } from '~/store/useAuthStore';
import { flyToCartAnimation } from '~/utils/animations/flyToCart';
import BuyOneClickModal from '../productcard/BuyOneClickModal.vue';

const authData = useAuthStore();
const isAuthenticated = ref(authData.isAuthenticated);

const showBuyOneClickModal = ref(false);
const buyoneclickProduct = ref(null);

const props = defineProps({
    productInfo: {
        type: Object,
        required: true
    },
    productChars: {
        type: Object,
    },
    productRating: {
        type: Number,
        default: null
    },
    additImages: {
        type: Array,
    }
    
});

const additionalImagesCount = computed(() => props.additImages.length);
const containerHeight = computed(() => {
    let height = 'calc((95vw - 1rem) / 2)';
    if (additionalImagesCount.value > 0) {
        if (window.innerWidth >= 767) {
            height = `calc(${height} + 7rem)`;
        } else {
            height = `auto`;
        }
    } else {
        if (window.innerWidth >= 767) {
            height = `calc(${height})`;
        } else {
            height = `auto`;
        }
    }
    return height;
});

const selectedQuantity = ref(1);

const updateQuantity = (newQuantity) => {
  if (newQuantity <= props.productInfo.quantity) {
    selectedQuantity.value = newQuantity;
    console.log('newQuantity', newQuantity)
  } else {
    console.log('показали сообщение')
  }
};
const visiblePrice = computed(() => {
    return props.productInfo.total_price * selectedQuantity.value;
});

const visibleUndiscountedPrice = computed(() => {
    return props.productInfo.price * selectedQuantity.value;
});

const addToCart = (event) => {
    const xA = event.clientX - 100;
    const yA = event.clientY;
    const cartButton = document.getElementById('cart-button');
    const buttonRect = cartButton.getBoundingClientRect();
    const headerRect = document.querySelector('header').getBoundingClientRect();
    const xB = buttonRect.left + window.scrollX - headerRect.left - 30;
    const yB = buttonRect.top - headerRect.top;
    if (isAuthenticated.value) {
        addToCartAUTH(xA, yA, xB, yB);
    } else {
        addToCartGUEST(xA, yA, xB, yB);
    }
};

const addToCartAUTH = async () => {
    console.log('добавляем в auth корзину', selectedQuantity.value)

    const config = useRuntimeConfig();
    const BASE_API_URL = config.public.apiBase;
    const endpoint = 'baskets/add/';

    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        product_id: props.productInfo.id,
        quantity: selectedQuantity.value
    });

    const response = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
    const responseData = await response.json();

    if (responseData.code === 0 || responseData.code === 1) {
        const productInfo = props.productInfo;
        const existingCartItem = CartStore.state.cartItems.find(item => item.productInfo.id === productInfo.id);
        if (existingCartItem) {
            const newQuantity = selectedQuantity.value + existingCartItem.quantity;
            CartStore.commit('updateCartItem', { productInfo, newQuantity });
            console.log('К-во товара в корзине обовлено');
        } else {
            CartStore.commit('addCartItem', { productInfo, quantity: selectedQuantity.value });
            console.log('Товар добавлен в корзину');
        }
        const productImg = document.querySelector('.main-image');
        const originalWidth = productImg.offsetWidth;
        await flyToCartAnimation(productImg, originalWidth, xA, yA, xB, yB);
    } else if (responseData.code === 2) {
        console.log(responseData.message);
    }
}
const addToCartGUEST = async (xA, yA, xB, yB) => {
    console.log('добавляем в гостевую корзину', selectedQuantity.value)
    const config = useRuntimeConfig();
    const BASE_API_URL = config.public.apiBase;
    const endpoint = 'baskets/add-guest/';

    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        product_id: props.productInfo.id,
        quantity: selectedQuantity.value
    });

    const response = await guestRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
    const responseData = await response.json();

    if (responseData.code === 0 || responseData.code === 1) {
        const productInfo = props.productInfo;
        const existingCartItem = CartStore.state.cartItems.find(item => item.productInfo.id === productInfo.id);
        if (existingCartItem) {
            const newQuantity = selectedQuantity.value + existingCartItem.quantity;
            CartStore.commit('updateCartItem', { productInfo, newQuantity });
            console.log('К-во товара в корзине обовлено');
        } else {
            CartStore.commit('addCartItem', { productInfo, quantity: selectedQuantity.value });
            console.log('Товар добавлен в корзину');
        }
        const productImg = document.querySelector('.main-image');
        const originalWidth = productImg.offsetWidth;
        await flyToCartAnimation(productImg, originalWidth, xA, yA, xB, yB);
    } else if (responseData.code === 2) {
        console.log(responseData.message);
    }
}

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
@media screen and (min-width: 595px) {
    .actions-container {
        display: flex;
        flex-direction: column;
    }
    .product-characteristics-container {
        display: block;
    }
}
@media screen and (max-width: 767px) {
    .product-characteristics-container {
        display: none !important;
    }
    .header-2 {
        font-size: 1.25rem !important;
    }
}
.product-characteristics-container {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-y: auto;
}
.product-characteristics-table {
  width: 100%;
  border-collapse: collapse;
  overflow-y: auto;
}
.product-characteristics-table td,
.product-characteristics-table th {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}
.product-characteristics-table th {
  background-color: #f2f2f2;
}
.star {
    font-size: 1.5rem;
}
.orange {
    color: orange;
}
.star.partfull {
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
.header-2 {
    font-size: 1.7rem;
}
</style>

<style>
</style>