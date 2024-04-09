<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\components/index/SubcategoriesCarousel.vue.vue -->

<template>
    <div>
        <h2>Популярные категории</h2>
        <div class="scroll-container">
            <div class="flex-container">
                <div v-for="(subcategory, index) in subcategories" :key="subcategory.id" class="subcategory">
                    <div class="card-image">
                        <template v-if="isLoading">
                            <Skeleton width="100%" :height="cardWidth"></Skeleton>
                        </template>
                        <template v-else>
                            <NuxtImg class="subcategory-img" :src="BASE_API_MEDIA + subcategory.image" :alt="`${subcategory.name} Image`" />
                        </template>
                    </div>
                    <div class="subcategory-name">{{ subcategory.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { loadImage } from '~/utils/func/loadImage';

const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;
const props = defineProps({
    subcategories: {
        type: Array,
        required: true,
    },
    screenWidth: {
        type: Number,
        required: true,
    }
});
const cardWidth = computed(() => {
    if (props.screenWidth > 500) {
        return "169px";
    } else {
        return "104px";
    }
});
const isLoading = ref(true);

onMounted(async () => {
    try {
        await Promise.all(props.subcategories.map(async (subcategory) => {
            await loadImage(BASE_API_MEDIA + subcategory.image);
        }));
        isLoading.value = false;
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
    }
});
</script>

<style scoped>
.scroll-container {
    width: 100%;
    overflow-x: auto;
}
.flex-container {
    height: 450px;
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
    height: auto;
}

@media screen and (max-width: 500px) {
    .flex-container {
        height: auto;
        max-height: 30rem;
        overflow-y: hidden;
    }
    .subcategory {
        width: 8rem;
        height: auto;
    }
}
.subcategory-img {
    width: 100%;
    height: auto;
}

.subcategory-name {
    text-align: center;
    margin-left: 0.2rem;
    min-height: 32px;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>