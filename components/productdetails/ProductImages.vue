<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\ProductImages.vue -->

<template>
    <div class="product-image-container">
        <img :src="BASE_API_MEDIA + image" alt="Product Image" />
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    image: String
});
</script>

<style scoped>
.product-image-container img {
    max-width: 100%;
    height: auto;
}
</style>