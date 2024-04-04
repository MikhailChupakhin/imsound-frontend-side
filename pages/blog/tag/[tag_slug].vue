<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\blog\category\[tag_slug].vue -->

<template>
  <div class="main_container">
    <Head :metaTitle="pageTitle" :metaDescription="metaDescription" />
    <MainHeader />
    <BreadcrumbsNav />
    <div class="blog-content ">
      <div class="col-12 content-wrapper">
        <div class="w-full md:w-9 lg:w-10 p-2 mb-3">
          <TagsCloud :linkPath="'/blog/tag/'" :activeTag="activeTag" />
        </div>
        <div class="w-full md:w-3 lg:w-2">
          <BlogNav :blogCategories="blogCategories" @categoryChanged="handleCategoryChange" />
        </div>
        <div class="mt-2">
          <ArticlesBlock />
          <BlogPagination :articlesCount="articlesCount" @update-article-list="updateArticleList" />
        </div>
      </div>
    </div>
    <FooterBottom />
  </div>
</template>

<script setup>
import { useBaseStore } from '~/store/baseData';

import Head from '~/components/common/Head.vue';
import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import TagsCloud from '~/components/common/TagsCloud.vue';
import BlogNav from '~/components/blog/BlogNav.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import ArticlesBlock from '~/components/blog/ArticlesBlock.vue';
import BlogPagination from '~/components/blog/BlogPagination.vue'

const baseStore = useBaseStore();

const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;

const endpoint = `blog/tag/${route.params.tag_slug}`;
const activeTag = ref(route.params.tag_slug);

const { data: blogData } = await useAsyncData(
  'blogData',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);

const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);

const breadcrumbs = ref(blogData.value.breadcrumbs);
provide('breadcrumbs', breadcrumbs);

const articlesList = ref(blogData.value.pagination.results);
provide('articlesList', articlesList);

const articlesCount = ref(blogData.value.pagination.count)

provide('tags_data', blogData.value.tags_data);

const blogCategories = ref(blogData.value.blog_categories);
const articlesQty = ref(blogData.value.pagination.articles_qty);
provide('articlesQty', articlesQty);

const pageTitle = ref(blogData.value.seo_data.title);
const metaDescription = ref(blogData.value.seo_data.meta_description);

const handleCategoryChange = async (selectedCategory) => {
  const config = useRuntimeConfig()
  const BASE_API_URL = config.public.apiBase;
  const endpoint = `blog/category/${selectedCategory.slug}/`;
  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    method: 'GET',
  });
  if (response.status === 200) {
    const responseData = await response.json();
    breadcrumbs.value = responseData.breadcrumbs;
    articlesList.value = responseData.pagination.results;
  }
};
const updateArticleList = (newArticleList) => {
  articlesList.value = newArticleList;
};
</script>

<style scoped>
.main_container {
  overflow-x: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.blog-content{
    width: 98%;
    margin: 0 auto;
}
.content-area {
  flex: 1;
  padding: 0px;
}
</style>