<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductsBlock.vue -->

<template>
    <div class="container">
        <ArticleCard class="item" v-for="article in articlesList" :articleInfo="article" />
    </div>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue';
const articlesList = inject('articlesList');


</script>

<style scoped>
.container {
    display: flex;
    flex-flow: column wrap;
    align-content: space-between;
    height: 3000px;
    border-radius: 3px;
    width: 100%;
    counter-reset: items;
}

@media screen and (min-width: 1300px) {
  .container {
    height: 3300px;
  }
}


.item {
    width: 32%;
    position: relative;
    margin-bottom: 2%;
    border-radius: 3px;
    border: 0.25px solid #000000;
    color: #000000;
    padding: 0.8rem;
    box-sizing: border-box;
}

@media screen and (max-width: 450px) {
    .container {
        height: auto;
        flex-direction: column;
    }
    .item {
        width: 95%;
        margin-bottom: 2%;
    }
}


@media (min-width: 450px) and (max-width: 700px) {
    .item {
        width: 46%;
        margin-bottom: 2%;
    }
    .item:nth-child(odd) {
        order: 1;
    }
    .item:nth-child(even) {
        order: 2;
    }
}

/* .item::before {
    counter-increment: items;
    content: counter(items);
} */
@media screen and (min-width: 701px) {
    /* Re-order items into 3 rows */
    .item:nth-child(3n+1) {
        order: 1;
    }

    .item:nth-child(3n+2) {
        order: 2;
    }

    .item:nth-child(3n) {
        order: 3;
    }
}

/* Force new columns */
.container::before,
.container::after {
    content: "";
    flex-basis: 100%;
    width: 0;
    order: 2;
}

body {
    font-family: sans-serif;
}

h3 {
    text-align: center;
}
</style>