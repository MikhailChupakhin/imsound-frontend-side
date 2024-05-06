<template>
    <TabView role="tablist">
        <TabPanel header="Описание" aria-labelledby="descriptionTab">
            <p class="m-0">
                <div v-if="productDescr.length > 0" v-html="productDescr"></div>
                <div v-else>Товару не добавлено описание</div>
            </p>
        </TabPanel>
        <TabPanel header="Отзывы" aria-labelledby="reviewsTab">
            <p class="m-0">
                <div v-if="productReviews.length > 0">
                <div v-for="(review, index) in productReviews" :key="index" class="review">
                    <div class="flex justify-content-between flex-wrap">
                        <div class="flex align-items-center justify-content-center"><strong>{{ review.user_initials }}</strong></div>
                        <div class="flex align-items-center justify-content-center"><Rating v-model="review.rating" readonly :cancel="false" /></div>
                        <div class="flex align-items-center justify-content-center"><strong>{{ formatDateFull(review.created_at) }}</strong></div>
                    </div>
                    <p><strong>Достоинства:</strong> {{ review.pros }}</p>
                    <Divider />
                    <p><strong>Недостатки:</strong> {{ review.cons }}</p>
                    <Divider />
                    <p>{{ review.text_comment }}</p>
                </div>
                <div class="mt-3">
                    <CommonInterfaceButton buttonText="оставить отзыв" :customStyle="{ width: '100%'}"/>
                </div>
            </div>
            <div v-else>
                <p class="text-xl">У этого товара еще нет отзывов, оставьте первый!</p>
                <CommonInterfaceButton buttonText="оставить отзыв" :customStyle="{ width: '50%'}" />
            </div>
            </p>
        </TabPanel>
        <TabPanel header="Характеристики" aria-labelledby="characteristicsTab">
            <p class="m-0">
                <template v-if="productChars && productChars.length > 0">
                    <table class="product-characteristics-table">
                        <tbody>
                            <tr v-for="(char, index) in productChars" :key="index">
                                <td>{{ char.name }}</td>
                                <td class="text-center">{{ char.value }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
                <template v-else>
                    <div>Товару не добавлены характеристики</div>
                </template>
            </p>
        </TabPanel>
    </TabView>
</template>

<script setup>
import { ref } from 'vue';
import { formatDateFull } from '~/utils/func/formatDate';

const currentMode = ref('description');

const props = defineProps({
    productDescr: {
        type: String,
    },
    productReviews: {
        type: Array,
        default: () => []
    },
    productChars: {
        type: Array,
    },
});

</script>

<style scoped>
.review {
    margin-top: 1rem;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.product-characteristics-table {
  width: 100%;
  border-collapse: collapse;
  overflow-y: auto;
}

.product-characteristics-table td,
.product-characteristics-table th {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.product-characteristics-table th {
  background-color: #f2f2f2;
}
</style>
