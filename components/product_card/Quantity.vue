<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\product_card\Quantity.vue -->

<template>
    <InputNumber v-model="quantity" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" :step="1">
        <template #incrementbuttonicon>
            <span class="pi pi-plus" />
        </template>
        <template #decrementbuttonicon>
            <span class="pi pi-minus" />
        </template>
    </InputNumber>
</template>
  
<script>
import { ref } from 'vue';

export default {
    setup() {
        const quantity = ref(1);

        return {
            quantity // Возвращаем value3 из setup
        };
    }
};
</script>

<style scoped></style>