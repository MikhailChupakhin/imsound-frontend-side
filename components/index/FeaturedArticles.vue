<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\index\FeaturedArticles.vue -->

<template>
    <h2>Популярные статьи блога</h2>
    <Carousel :value="articles" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" circular
        :autoplayInterval="15000">
        <template #item="slotProps">
            <div class="index-article border-1 surface-border border-round m-2 p-3">
                <div class="mb-3">
                    <div class="relative mx-auto">
                        <img :src="BASE_API_MEDIA + slotProps.data.image" :alt="slotProps.data.name"
                            class="w-full border-round" />
                    </div>
                </div>
                <div class="mb-3 text-center text-xl font-bold">{{ slotProps.data.title }}</div>
                <div class="article-content-preview" v-html="slotProps.data.is_index_preview"></div>
                <Divider />
                <div class="bottom-block grid">
                    <div class="col-6"><svg class="svg-icon-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="32. Veiw" id="_32._Veiw"><path d="M23.909,11.582C21.943,7.311,17.5,3,12,3S2.057,7.311.091,11.582a1.008,1.008,0,0,0,0,.836C2.057,16.689,6.5,21,12,21s9.943-4.311,11.909-8.582A1.008,1.008,0,0,0,23.909,11.582ZM12,19c-4.411,0-8.146-3.552-9.89-7C3.854,8.552,7.589,5,12,5s8.146,3.552,9.89,7C20.146,15.448,16.411,19,12,19Z"/><path d="M12,7a5,5,0,1,0,5,5A5.006,5.006,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z"/></g></svg> {{ slotProps.data.views_counter }}</div>
                    <div class="col-6  flex justify-content-end"v-if="slotProps.data.reading_time">{{ pluralize(slotProps.data.reading_time, 'минут') }}</div>
                </div>
            </div>
        </template>
    </Carousel>
</template>

<script setup>
import pluralize from '~/utils/func/pluralize.js';
import Carousel from 'primevue/carousel';
import { formatPrice } from '~/utils/priceFormatter.js';
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    articles: {
        type: Object,
        required: true
    }
});

const responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 1
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];
</script>

<style scoped>
.index-article {
    display: flex;
    flex-direction: column;
    height: 30rem;
}
.article-content-preview {
    height: 100%;
}
.bottom-block {
    align-items: flex-end;
}
</style>