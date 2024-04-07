<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\components/index/SubcategoriesCarousel.vue.vue -->

<template>
    <div>
        <h2>Популярные категории</h2>
        <div class="scroll-container">
            <div class="flex-container">
                <div v-for="(subcategory, index) in subcategories" :key="subcategory.id" class="subcategory">
                    <img class="subcategory-img" :src="BASE_API_MEDIA + subcategory.image" alt="">
                    <div class="subcategory-name">{{ subcategory.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;
const props = defineProps({
    subcategories: {
        type: Array,
        required: true,
    },
});
</script>

<style scoped>
.scroll-container {
    width: 100%;
    overflow-x: auto;
}
.flex-container {
    height: 485px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.flex-container>.subcategory {
    flex: 0 0 auto;
    margin-right: 10px;
}
.subcategory {
    width: 10rem;
    height: 15rem;
}
.subcategory-img {
    width: 100%;
    height: auto;
}

.subcategory-name {
    margin-top: 8px;
    font-size: 1.5rem;
    font-weight: 500;
    text-align: center;
    padding: 0px 1rem;
}
</style>