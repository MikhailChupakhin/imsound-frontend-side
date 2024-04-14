<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\blog\index.vue -->

<template>
  <div class="main_container">
    <MainHeader />
    <BreadcrumbsNav />
    <div class="blog-content">
      <div class="col-12 content-wrapper">
        <div class="w-full md:w-9 lg:w-10 p-2 mb-3">
          <TagsCloud :linkPath="'/blog/tag/'" :activeTag="activeTag" />
        </div>
        <div class="w-full md:w-3 lg:w-2">
          <BlogNav :blogCategories="blogCategories" @categoryChanged="handleCategoryChange" />
        </div>
        <div class="w-full mt-2">
          <BlogPagination :articlesCount="articlesCount" @update-article-list="updateArticleList" />
        </div>
        <div class="w-full mt-2">
          <ArticlesBlock />
        </div>
        <ScrollTop :threshold="100"/>
        <button @click="handleStrangeButtonClick">какая-то кнопочка</button>
      </div>
    </div>
    <FooterBottom />
  </div>
</template>

<script setup>
import { useBaseStore } from '~/store/baseData';
import MainHeader from '~/components/header/MainHeader.vue'
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import TagsCloud from '~/components/common/TagsCloud.vue';
import BlogNav from '~/components/blog/BlogNav.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import ArticlesBlock from '~/components/blog/ArticlesBlock.vue';
import BlogPagination from '~/components/blog/BlogPagination.vue'
import useSeoData from '~/composables/useSeoData';
import ScrollTop from 'primevue/scrolltop';
const router = useRouter();

const baseStore = useBaseStore();

const config = useRuntimeConfig()
const BASE_API_URL = config.public.apiBase;
const endpoint = 'blog/';

const activeTag = ref('None');

const { data: blogData } = await useAsyncData(
  'blogData',
  () => {
    const { query, fullPath } = router.currentRoute.value;
    let endpoint;
    if (fullPath === '/blog' && !query.category) {
      endpoint = 'blog';
      return $fetch(`${BASE_API_URL}${endpoint}`);
    } else if (query.category) {
      endpoint = `blog/category/${query.category}/`;
      return $fetch(`${BASE_API_URL}${endpoint}`);
    }
  }
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

const currentPage = ref(blogData.value.pagination.current_page);
provide('currentPage', currentPage);
const articlesQty = ref(blogData.value.pagination.articles_qty);
provide('articlesQty', articlesQty);

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

useSeoData(blogData.value.seo_data.title, blogData.value.seo_data.meta_description);

function applyHueRotateAnimation() {
    const images = document.querySelectorAll('.article-card img');
    console.log(images)

    images.forEach(image => {
        let hue = 0;
        let increasing = true;

        const applyHueRotate = () => {
            if (increasing) {
                hue += 1;
                if (hue >= 360) {
                    hue = 360;
                    increasing = false;
                }
            } else {
                hue -= 1;
                if (hue <= 0) {
                    hue = 0;
                    increasing = true;
                }
            }
            image.style.filter = `hue-rotate(${hue}deg)`;
        };

        setInterval(applyHueRotate, 10);
    });
}

function applySkewAnimation() {
    const images = document.querySelectorAll('.article-card img');
    let time = 0;
    const frequency = 100;
    const amplitude = 0.2;

    images.forEach(image => {
        const applySkew = () => {
            time += 0.1;
            const skew = Math.sin(time * frequency) * amplitude;
            image.style.transform = `skewY(${skew}deg)`;
        };

        setInterval(applySkew, 10);
    });
}



const handleStrangeButtonClick = () => {
      applySkewAnimation();
      applyHueRotateAnimation();
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

.p-scrolltop.p-link {
  background: rgba(255, 132, 0, 0.7)
}
.p-icon {
  color: black;
}
</style>