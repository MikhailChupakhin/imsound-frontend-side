<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\blog\ArticleCard.vue -->

<template>
    <div class="article-card">
      <img :src="BASE_API_MEDIA + articleInfo.image" :alt="articleInfo.title" class="article-image" />
      <div class="article-content">
        <h2>{{ articleInfo.title }}</h2>
        <Divider />
        <div class="flex justify-content-between">
            <p class="flex align-items-center justify-content-center">{{ articleInfo.views_counter }} просмотров</p>
            <p v-if="articleInfo.reading_time" class="flex align-items-center justify-content-center" title="Время на прочтение">
                <strong>{{ pluralize(articleInfo.reading_time, 'минут') }}</strong>
            </p>
            <p v-else></p>
        </div>
        <Divider />
        <div class="content-start">
            <div v-html="articleInfo.content"></div>
        </div>
        <Divider />
        <p class="flex justify-content-end">{{ formatDate(articleInfo.created_timestamp) }}</p>
      </div>
    </div>
</template>
  
<script setup>
import pluralize from '~/utils/func/pluralize.js';
import Divider from 'primevue/divider';

const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
  articleInfo: {
    type: Object,
    required: true
  }
});

const formatDate = (timestamp) => {
  const date = new Date(props.articleInfo.created_timestamp);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
</script>

<style scoped>
.article-card {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.8rem;
}

.article-image {
    width: 100%;
    max-height: auto;
    object-fit: cover;
    border-radius: 5px;
}



.article-content {
    margin-top: 1rem;
}

.article-content h2 {
    margin: 0;
}

.article-content p {
    margin: 5px 0;
}
.content-start div {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>