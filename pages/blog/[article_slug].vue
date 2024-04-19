<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\blog\[article_slug].vue -->

<template>
    <div class="main_container">
      <MainHeader />
      <BreadcrumbsNav :showHeading="false" />
      <div class="content-wrapper">
        <div class="flex flex-column md:flex-row lg:flex-row">
          <div class="col-12 md:col-8 lg:col-8">
            <ArticleBody :articleInfo="articleData.article" />
            <Divider />
            <div class="flex flex-column">
              <h2>Статьи этой категории</h2>
              <div class="related-articles-btns">
                <div class="col-6">
                  <CommonInterfaceButton buttonText=" < назад" @click="prevRelatedArticle" />
                </div>
                <div class="col-6 text-right">
                    <CommonInterfaceButton buttonText="вперед >" @click="nextRelatedArticle" />
                </div>
              </div>
              <ArticleComments :articleId="articleData.article.id" :comments="articleData.comments" />
            </div>
          </div>
          <div class="col-12 md:col-4 lg:col-4">
            <ArticleNav :blogTags="articleData.all_tags" :blogCategories="articleData.blog_categories" :topArticles="articleData.top_articles" />
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
</template>
  

<script setup>
import { useBaseStore } from '~/store/baseData';
import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import ArticleBody from '~/components/articledetails/ArticleBody.vue';
import ArticleNav from '~/components/articledetails/ArticleNav.vue';
import ArticleComments from '~/components/articledetails/ArticleComments.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import useSeoData from '~/composables/useSeoData';
const baseStore = useBaseStore();
const router = useRouter();
const route = useRoute();
const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = `blog/article/${route.params.article_slug}`;
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);
let relatedArticles = [];

const { data: articleData, error, status } = await useAsyncData(
  'articleData',
  () => $fetch(`${BASE_API_URL}${endpoint}`)
);

if (status.value == 'success') {
  provide('breadcrumbs', articleData.value.breadcrumbs);
  relatedArticles = articleData.value.related_articles;
  useSeoData(articleData.value.seo_data.title, articleData.value.seo_data.meta_description);
} else if (status.value == 'error') {
  console.error("Произошла ошибка при загрузке данных:", error);
  router.push('/404');
}

const prevRelatedArticle = () => {
  if (Array.isArray(relatedArticles)) {
    const currentIndex = relatedArticles.findIndex(article => article.slug === route.params.article_slug);

    if (currentIndex > 0) {
      const prevArticle = relatedArticles[currentIndex - 1];
      router.push(`/blog/${prevArticle.slug}`);
    }
  } else {
    console.error("Related_articles не является массивом.");
  }
};

const nextRelatedArticle = () => {
  if (Array.isArray(relatedArticles)) {
    const currentIndex = relatedArticles.findIndex(article => article.slug === route.params.article_slug);

    if (currentIndex < relatedArticles.length - 1) {
      const nextArticle = relatedArticles[currentIndex + 1];
      router.push(`/blog/${nextArticle.slug}`);
    }
  } else {
    console.error("Related_articles не является массивом.");
  }
};
</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
}
.content-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
  margin-left: 0.9rem;
  margin-right: 0.9rem;
  padding-top: 0.2rem;
}
.related-articles-btns{
  background-color: rgb(236, 236, 236);
  height: auto;
  display: flex;
  justify-content: space-between;
}
.related-articles-btns button {
  font-size: 1.2rem;
  border-radius: 5px;
}
</style>