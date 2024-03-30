<template>
    <div class="descr-reviews-container">
        <!-- Control buttons -->
        <div>
            <button @click="showDescription">Описание</button>
            <button @click="showReviews">Отзывы</button>
        </div>

        <!-- Product description -->
        <div v-if="currentMode === 'description'">
            <div v-html="productDescr"></div>
        </div>

        <!-- Product reviews -->
        <div v-else-if="currentMode === 'reviews'">
            <div v-if="productReviews.length > 0">
                <div v-for="(review, index) in productReviews" :key="index" class="review">
                    <div class="flex justify-content-between flex-wrap">
                        <div class="flex align-items-center justify-content-center">{{ review.user_initials }}</div>
                        <div class="flex align-items-center justify-content-center">рейтинг - {{ review.rating}}</div>
                        <div class="flex align-items-center justify-content-center">{{ review.created_at }}</div>
                    </div>
                    <p>{{ review.pros }}</p>
                    <p>{{ review.cons }}</p>
                    <p>{{ review.text_comment }}</p>
                </div>
                <button class="leave-review-button">Оставить отзыв</button>
            </div>
            <div v-else>
                <p>У этого товара еще нет отзывов, оставьте первый!</p>
                <button class="leave-review-button">Оставить отзыв</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const currentMode = ref('description');

const props = defineProps({
    productDescr: {
        type: String,
    },
    productReviews: {
        type: Array,
        default: () => []
    },
});

// Функция для переключения на режим отображения описания
const showDescription = () => {
    currentMode.value = 'description';
};

// Функция для переключения на режим отображения отзывов
const showReviews = () => {
    currentMode.value = 'reviews';
};
</script>

<style scoped>
/* Стили могут быть добавлены по желанию */
</style>