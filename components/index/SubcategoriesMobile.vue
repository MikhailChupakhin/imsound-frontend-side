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
    width: 13rem;
    height: 15rem;
}

@media screen and (max-width: 500px) {
    .flex-container {
        height: 350px;
    }
    .subcategory {
        width: 8rem;
        height: 12rem;
    }
}
.subcategory-img {
    width: 100%;
    height: auto;
}

.subcategory-name {
    margin-left: 0.2rem;
    font-size: 1rem;
    font-weight: 500;
}
</style>