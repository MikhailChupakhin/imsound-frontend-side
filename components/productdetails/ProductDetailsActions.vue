<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\ProductImages.vue -->

<template>
    <div class="actions-container">
        <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center">Производитель</div>
            <div class="flex align-items-center justify-content-center">{{ productData.manufacturer_name }}</div>
        </div>
        <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center">Цена</div>
            <div class="flex align-items-center justify-content-center">{{ productData.price }}/{{
                productData.total_price }}</div>
        </div>
        <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center">Количество</div>
            <div class="flex align-items-center justify-content-center">
                <div v-if="productData.quantity > 0" class="flex justify-content-center mb-4">
                    <QuantityVue :initialQuantity="1" :max-value="productData.quantity"  />
                    <!-- @quantity-change="updateQuantity" -->
                </div>
                <div v-else class="not-available-text">Нет в наличии</div>
            </div>
        </div>
        <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center">Рейтинг</div>
            <div class="flex align-items-center justify-content-center">{{ productRating }}</div>
        </div>
        <div class="flex justify-content-between flex-wrap">
            <div class="flex align-items-center justify-content-center">Наличие: {{ productData.quantity }}</div>
            <div class="flex align-items-center justify-content-center">Артикул: {{ productData.article_number }}</div>
        </div>
        <div class="flex justify-content-between flex-wrap">
            <button class="flex align-items-center justify-content-center">Купить в 1 клик</button>
            <button class="flex align-items-center justify-content-center">В корзину</button>
        </div>
        <div class="flex justify-content-between flex-wrap">
            <table class="product-characteristics-table">
                <tbody>
                    <tr v-for="(char, index) in productChars" :key="index">
                        <td>{{ char.name }}</td>
                        <td>{{ char.value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import QuantityVue from '~/components/productcard/Quantity.vue';

const props = defineProps({

    productData: {
        type: Object,
        required: true
    },
    productChars: {
        type: Object,
    },
    productRating: {
        type: Number,
        default: null
    }
});

</script>

<style scoped>
.product-characteristics-table {
    width: 100%;
    border-collapse: collapse;
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
</style>