<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
    <div class="grid">
        <div class="col-12 md:col-6 lg:col-4"  v-for="(article, index) in articlesList">
            <ArticleCard  :key="index" :articleInfo="article"/>
        </div>
    </div>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue';

const articlesList = inject('articlesList');

</script>


<style scoped>
.articles-block-container {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1.6rem;
}
</style>