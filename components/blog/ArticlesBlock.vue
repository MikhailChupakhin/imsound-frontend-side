<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ArticlesBlock.vue -->

<template>
    <div class="container" id="content-container">
        <ArticleCard class="item" v-for="article in articlesList" :articleInfo="article" :cardWidth="cardWidth" />
    </div>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue';
const articlesList = inject('articlesList');
const cardWidth = ref(null);

onMounted(() => {
  const screenWidth = window.innerWidth;
  const containerElement = document.getElementById('content-container');
  const containerWidth = containerElement.getBoundingClientRect().width;

  if (screenWidth < 450) {
    cardWidth.value = (containerWidth - 14);
  } else if (screenWidth >= 450 && screenWidth < 700) {
    cardWidth.value = ((containerWidth / 2).toFixed(2) - 14);
  } else {
    cardWidth.value = (((containerWidth * 99) / (3 * 100)).toFixed(2) - 14);
  }
});

</script>

<style scoped>
.item {
    width: 33%;
    position: relative;
    margin-bottom: 2%;
    box-sizing: border-box;
    padding: 7px;
}
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
@media screen and (max-width: 450px) {
    .container {
        height: auto;
        flex-direction: column;
        justify-content: center;
    }
    .item {
        width: 100%;
        margin-bottom: 2%;
    }
}


@media (min-width: 450px) and (max-width: 700px) {
    .item {
        width: 50%;
        margin-bottom: 2%;
    }
    .item:nth-child(odd) {
        order: 1;
    }
    .item:nth-child(even) {
        order: 2;
    }
}

@media screen and (min-width: 701px) {
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