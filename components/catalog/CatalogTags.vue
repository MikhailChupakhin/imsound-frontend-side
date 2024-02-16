<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogTags.vue -->

<template>
    <div class="tags_container mt-5">
      <p>Тэги</p>
      <div class="tags">
        <NuxtLink v-for="(tag, index) in tags_data" :key="index" :to="`/catalog/tags/${tag.slug}`" class="tag_link">{{ tag.name }}</NuxtLink>
      </div>
    </div>
  </template>
  
<script>
export default {
    inject: ['tags_data'],
};
</script>
  
<style scoped>
.tags_container {
  border: 1px solid black;
  padding: 10px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag_link {
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 5px 10px;
  background-color: #ccc;
  border-radius: 5px;
  text-decoration: none;
  color: black;
}

.tag_link:hover {
  background-color: #999;
}
</style>