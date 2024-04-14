<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\blog\ArticleCard.vue -->

<template>
    <div class="article-card">
      <router-link :to="`/blog/${articleInfo.slug}`">
        <img :src="BASE_API_MEDIA + articleInfo.image" :alt="articleInfo.title" class="article-image" />
      </router-link>
      <div class="article-content">
        <router-link class="r-link":to="`/blog/${articleInfo.slug}`">
          <h2>{{ articleInfo.title }}</h2>
        </router-link>
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
import { formatDate } from '~/utils/func/formatDate';

const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
  articleInfo: {
    type: Object,
    required: true
  }
});

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
.r-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>