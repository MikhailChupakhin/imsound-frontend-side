<template>
  <div class="item">
    <div class="article-card">
      <template v-if="isLoading">
        <Skeleton :width="cardWidth+'px'" :height="skeletonHeight"></Skeleton>
      </template>
      <template v-else>
          <router-link :to="`/blog/${articleInfo.slug}`">
            <img :src="BASE_API_MEDIA + articleInfo.image" :alt="articleInfo.title" class="article-image" />
          </router-link>
        </template>
      <div class="article-content">
        <router-link class="r-link" :to="`/blog/${articleInfo.slug}`">
          <h2>{{ articleInfo.title }}</h2>
        </router-link>
        <Divider />
        <div class="flex justify-content-between">
          <p class="flex align-items-center justify-content-center">{{ articleInfo.views_counter }} просмотров</p>
          <p v-if="articleInfo.reading_time" class="flex align-items-center justify-content-center"
            title="Время на прочтение">
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
  </div>
</template>

<script setup>
import pluralize from '~/utils/func/pluralize.js';
import Divider from 'primevue/divider';
import { formatDate } from '~/utils/func/formatDate';
import { loadImage } from '~/utils/func/loadImage';
const isLoading = ref(true);
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
  articleInfo: {
    type: Object,
    required: true
  },
  cardWidth:{
    type: Number,
  }
});
let skeletonHeight = ref('500px');
watch(() => props.cardWidth, async (newWidth) => {
  skeletonHeight.value = (props.cardWidth * props.articleInfo.image_sizes).toFixed(2).toString() + 'px';
});

onMounted(async () => {
    try {
      await loadImage(BASE_API_MEDIA + props.articleInfo.image);
      isLoading.value = false;
    } catch (error) {
      console.error('Ошибка при загрузке изображений:', error);
    }
});

</script>

<style scoped>
.article-card {
  width: 100%;
  border-radius: 5px;
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