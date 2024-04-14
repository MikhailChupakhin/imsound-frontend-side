<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\articledetails\ArticleNav.vue -->

<template>
    <div class="flex flex-column left-border">
        <div class="col-12 md:col-12 lg:col-12">
            <h4>Облако тэгов</h4>
            <TagsCloud :linkPath="'/blog/tag/'" :activeTag="null" />
        </div>
        <Divider />
        <div class="col-12 md:col-12 lg:col-12">
            <h4>Перейти к категории блога</h4>
            <BlogNav :blogCategories="blogCategories" @categoryChanged="handleCategoryChange" />
        </div>
        <Divider />
        <div class="popular-articles col-12">
            <h4>Популярные статьи</h4>
            <div v-for="article in topArticles" :key="article.id" class="article-preview">
                <div class="flex flex-row">
                    <router-link :to="`/blog/${article.slug}`">
                        <img :src="BASE_API_MEDIA + article.image" alt="Preview" class="preview-image" />
                    </router-link>
                    <div class="flex flex-column justify-content-between">
                        <router-link class="r-link" :to="`/blog/${article.slug}`">
                            <span class="article-title">{{ article.title }}</span>
                        </router-link>
                        <div>{{ formatDate(article.created_timestamp) }}</div>
                    </div>
                </div>
                <Divider />
            </div>
        </div>
    </div>
</template>

<script setup>
import TagsCloud from '~/components/common/TagsCloud.vue';
import BlogNav from '~/components/blog/BlogNav.vue';
import { formatDate } from '~/utils/func/formatDate';

const router = useRouter();
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;

const props = defineProps({
    blogTags: {
        type: Object,
        required: true,
    },
    blogCategories: {
        type: Object,
        required: true,
    },
    topArticles: {
        type: Object,
        required: true,
    },
});
const blogTags = ref(props.blogTags);
provide('tags_data', blogTags);

const handleCategoryChange = async (selectedCategory) => {
    await router.push({ path: '/blog', query: { category: selectedCategory.slug } });
};
</script>

<style scoped>
.article-preview {
    margin-top: 2rem;
}
@media screen and (min-width: 768px) {
    .left-border {
        border-left: 0.5px solid #ccc;
        padding-left: 10px;
    }
}
.preview-image {
  width: 100px;
  height: auto;
  margin-right: 10px;
}
.article-title {
  font-size: 1.5rem;
}
.r-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>