<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\checkout\CheckoutOutput.vue -->

<template>
    <div class="payment-section"></div>
    <p class="section-title">Данные о заказе</p>
    <table class="checkout-table">
        <thead>
            <tr>
                <th>Название</th>
                <th>Количество</th>
                <th>Общая стоимость</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in cartItems" :key="index">
                <td class="centered-cell">{{ item.product_name }}</td>
                <td class="centered-cell">{{ item.quantity }}</td>
                <td class="centered-cell">{{ formatPrice(calculateTotalPrice(item)) }}</td>
            </tr>
            <tr>
                <td colspan="2" class="table-label">Общая стоимость товаров:</td>
                <td class="centered-cell">{{ formatPrice(totalOrderPrice) }}</td>
            </tr>
            <tr>
                <td colspan="2" class="table-label">Стоимость доставки:</td>
                <td class="centered-cell">{{ formatPrice(deliveryMethodPrice) }}</td>
            </tr>
            <tr>
                <td colspan="2" class="table-label">Итоговая стоимость заказа:</td>
                <td class="centered-cell">{{ formatPrice(totalOrderPrice + deliveryMethodPrice) }}</td>
            </tr>
        </tbody>
    </table>
    <div class="section">
        <p class="section-title">Способ оплаты</p>
        <div v-for="method in props.paymentMethods" :key="method.id">
            <input 
                type="radio" 
                :id="'method_' + method.id" 
                v-model="selectedPaymentMethod" 
                :value="method.id"
                class="rounded-checkbox">
            <label :for="'method_' + method.id" class="rounded-label">{{ method.name }}</label>
        </div>
    </div>
    <div class="order-complete">
        <ButtonAnimated 
            buttonText="Оформить" 
            :handleClick="handleClickCheckout" 
            :addClasses="123" 
        />
    </div> 
</template>

<script setup>
import { formatPrice } from '~/utils/priceFormatter.js';
import ButtonAnimated from '~/components/common/ButtonAnimated.vue';

const props = defineProps({
    cartItems: Object,
    deliveryMethodData: Object,
    paymentMethods: Array,
    handleCheckout: Function,
});

const selectedPaymentMethod = ref(null);

const cartItems = computed(() => props.cartItems);

const calculateTotalPrice = (item) => {
    return parseFloat(item.quantity) * parseFloat(item.total_price);
};

const totalOrderPrice = computed(() => {
    return Object.values(cartItems.value).reduce((total, item) => {
        return total + calculateTotalPrice(item);
    }, 0);
});

const deliveryMethodPrice = computed(() => {
    return props.deliveryMethodData.price;
});

const handleClickCheckout = () => {
    props.handleCheckout(selectedPaymentMethod.value);
};
</script>


<style scoped>
.checkout-output {
    width: 90%;
}

.section-title {
    font-size: 1.8rem;
    font-weight: 500;
}

.checkout-table {
    width: 100%;
    border-collapse: collapse;
}

.checkout-table th,
.checkout-table td {
    padding: 3px;
    border: 1px solid #000;
}

.order-complete {
    margin-top: 2rem;
    height: 3rem;
}
.table-label {
    text-align: center;
}
.centered-cell {
    text-align: center;
}
</style>