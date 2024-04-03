<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\product_card\Quantity.vue -->

<template>
    <div class="quantity-control">
        <button class="quantity-btn" @click="changeQuantity('decrease')">-</button>
        <input class="quantity-input" type="number" v-model="quantity" min="1" :max="maxValue" @change="inputQuantity" />
        <button class="quantity-btn" @click="changeQuantity('increase')">+</button>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useAuthStore } from '@/store/useAuthStore';

export default {
    props: {
        initialQuantity: {
            type: Number,
            default: 1
        },
        maxValue: {
            type: Number,
        },
        productId: {
            type: Number,
            required: true
        }
    },
    setup(props, { emit }) {
        const quantity = ref(props.initialQuantity);
        const authStore = useAuthStore();
        
        const config = useRuntimeConfig();
        const BASE_API_URL = config.public.apiBase;
        
        const isUserAuthenticated = computed(() => authStore.isAuthenticated);

        const changeQuantity = async (operation) => {
            if (isUserAuthenticated.value) {
                (async () => {
                    const endpoint = 'users/cart/update/'
                    const body = JSON.stringify({'product_id': props.productId, 'operation_type': operation});
                    const headers = {
                    'Content-Type': 'application/json',
                    };
                    const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
                    const responseData = await apiResponse.json();
                    handleResponseData(responseData);
                })();
            } else {
                const endpoint = 'users/cart-guest/update/';
                const body = JSON.stringify({'product_id': props.productId, 'operation_type': operation});
                const headers = {
                    'Content-Type': 'application/json',
                };
                const apiResponse = await guestRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
                const responseData = await apiResponse.json();
                console.log(responseData);
                handleResponseData(responseData);
            }
        };

        
        const inputQuantity = async () => {
            if (isUserAuthenticated.value) {
                (async () => {
                    const endpoint = 'users/cart/update/'
                    const body = JSON.stringify({'product_id': props.productId, 'operation_type': 'input', 'input_quantity': quantity.value});
                    const headers = {
                    'Content-Type': 'application/json',
                    };
                    const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
                    const responseData = await apiResponse.json();
                    handleResponseData(responseData);
                })();
            } else {
                const endpoint = 'users/cart_guest/update/';
                const body = JSON.stringify({'product_id': props.productId, 'operation_type': operation});
                // Доделать при возвращении к гостевой логике
                guestToken =  '123'
                const headers = {
                    'Content-Type': 'application/json',
                    'guest-token': guestToken,
                };
                try {
                    const response = await fetch(BASE_API_URL + endpoint, {
                        method: 'POST',
                        headers: headers,
                        body: body
                    });
                    const responseData = await response.json();
                    console.log(responseData);
                    handleResponseData(responseData);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        const updateItemTrigger = (item, newQuantity) => {
            emit('update-item', { item, newQuantity });
        };

        const handleResponseData = (responseData) => {
            if (responseData.message === 'performed') {s
                quantity.value = responseData.upd_qty;
                emit('quantity-change', { productId: props.productId, quantity: quantity.value });
                emit('update-item', { productId: props.productId, quantity: quantity.value });
            } else if (responseData.error === 'minimal') {
                console.log('Reached minimal value');
            } else if (responseData.error === 'maximal') {
                console.log('Reached maximal value');
            } else if (responseData.message === 'excess') {
                quantity.value = responseData.upd_qty;
                emit('quantity-change', { productId: props.productId, quantity: quantity.value });
            }
        };

        return {
            quantity,
            changeQuantity,
            inputQuantity,
            updateItemTrigger,
            isUserAuthenticated,
            maxValue: props.maxValue
        };
    }
};
</script>

<style scoped>
.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-btn {
    width: 1.8rem;
    height: 1.8rem;
    text-align: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 50%;
}

.quantity-input {
    margin-left: 1px;
    margin-right: 1px;
    width: 2.5rem;
    height: 2rem;
    text-align: center;
    font-size: 1.1rem;
    padding: 0.3rem;
    -moz-appearance: textfield;
    appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>