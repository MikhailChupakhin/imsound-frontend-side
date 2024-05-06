<template>
    <div>
        <NuxtImg class="article-image w-full lg:w-7" :src="BASE_API_MEDIA + articleInfo.image" :alt="`${articleInfo.title} Image`" loading="lazy" />
    </div>
    <div class="article-body">
        <h1>{{ articleInfo.title }}</h1>
        <ul>
            <li>Автор: <span>{{ articleInfo.author }}</span></li>
            <li>{{ formatDateFull(articleInfo.created_timestamp) }}</li>
            <li>Просмотров - {{ articleInfo.views_counter }}</li>
        </ul>
        <Divider />
        <div v-html="articleInfo.content"></div>
    </div>
</template>

<script setup> 
import { formatDateFull } from '~/utils/func/formatDate';

const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    articleInfo: {
        type: Object,
        required: true,
    },
});
</script>

<style scoped>
.article-body ul {
    padding-left: 0;
}
.article-body ul li {
    font-size: 1rem;
    color: #888888;
    display: inline-block;
    list-style: none;
    margin-right: 1.5rem;
    position: relative;
}
</style>