<template>
     <div class="flex lg:flex-row sm:flex-column">
        <input class="promo-code-input" v-model="promoCode" type="text" placeholder="Ввести промо-код"  style="flex: 1;" />
        <div>
            <ButtonAnimated buttonText="Применить" :handleClick="applyPromoCode" :addClasses="123" />
        </div>
    </div>
</template>

<script setup>
import ButtonAnimated from '~/components/common/ButtonAnimated.vue';

const promoCode = ref('');

const applyPromoCode = () => {
    console.log('Промо-код:', promoCode.value);
};
</script>

<style scoped>
    .flex {
        display: flex;
    }

    .lg\:flex-row {
        flex-direction: row;
    }

    .sm\:flex-column {
        flex-direction: column;
    }

    input {
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
</style>