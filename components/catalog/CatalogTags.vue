<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogTags.vue -->

<template>
  <div class="grid align-items-center border-1 border-round-sm surface-border p-1">
    <div class="tags-heading col-2 md:col-1 lg:col-1 pl-2">Тэги</div>
    <div class="tags-list col-10 md:col-11 lg:col-11 flex align-items-center">
      <div class="tags flex flex-row flex-wrap">
        <NuxtLink v-for="(tag, index) in tags_data" :key="index" :to="`/catalog/tags/${tag.slug}`" class="tag_link">
          {{ tag.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['tags_data'],
};
</script>

<style scoped>
.tags-heading {
  padding: 0.1rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.tags-list {
  padding: 0.1rem;
}

.tag_link {
  padding: 0.3rem;
  margin-right: 0.2rem;
  background-color: rgb(207, 228, 228);
  border-radius: 0.8rem;
  border: 1px solid #eee;
  text-decoration: none;
  color: black;
}

.tag_link:hover {
  background-color: #999;
}
</style>