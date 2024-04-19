<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\common\RatingStars.vue -->

<template>
    <Rating v-model="starsQuantity" readonly :cancel="false" :title="`Рейтинг: ${props.rating}`" />
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

