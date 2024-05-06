<template>
    <Rating v-model="starsQuantity" readonly :cancel="false" :title="`Рейтинг: ${props.rating.toFixed(2)}`" />
</template>

<script setup>
const props = defineProps({
    rating: Number
});

const starsQuantity = Math.round(props.rating);
</script>

<style>
.p-rating-item .p-icon{
    color: orange;
}
</style>

