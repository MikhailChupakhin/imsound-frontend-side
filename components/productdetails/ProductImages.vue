<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\ProductImages.vue -->

<template>
    <div class="product-image-container">
        <img class="main-image" :src="BASE_API_MEDIA + images[mainImageIndex]" alt="Product Image" />
        <div v-if="images.length > 1" class="additional-images">
            <div v-for="(additionalImage, index) in images.slice(1)" :key="index" class="additional-image">
                <img :src="BASE_API_MEDIA + additionalImage" alt="Additional Image" @click="swapImages(index + 1)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    image: String,
    additImages: Array
});

const mainImageIndex = ref(0);
const images = ref([]);

const computedImages = computed(() => {
    const allImages = [props.image, ...props.additImages.map(image => image.image)];
    return allImages;
});

images.value = computedImages.value;

function swapImages(index) {
    const temp = images.value[0];
    images.value[0] = images.value[index];
    images.value[index] = temp;
    mainImageIndex.value = 0;
}
</script>

<style scoped>
.product-image-container img {
    max-width: 100%;
    height: auto;
}
.main-image {
    width: 100%;
    height: auto;
    transition: opacity 0.3s ease;
}
.additional-images {
    display: flex;
    overflow-x: auto;
}
.additional-image img {
    width: 7rem;
    height: 7rem;
    cursor: pointer;
    margin-right: 0.5rem;
    border: 1px solid black;
}
.additional-image img {
    opacity: 1;
    transition: opacity 0.3s ease;
}

.additional-image img.hide {
    opacity: 0;
}
</style>