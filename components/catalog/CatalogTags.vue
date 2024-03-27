<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogTags.vue -->

<template>
  <div class="grid align-items-center">
    <div class="tags-list col-10 md:col-11 lg:col-11 flex align-items-center">
      <div class="tags flex flex-row flex-wrap gap-1">
        <NuxtLink v-for="(tag, index) in tags_data" :key="index" :to="`/catalog/tags/${tag.slug}`" class="tag_link">
          {{ tag.name.toLowerCase() }}
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
  padding: 0.2rem 0.4rem;
  margin-right: 0.2rem;
  background-color: rgb(236, 236, 236);
  border-radius: 0.8rem;
  border: 1px solid #eee;
  text-decoration: none;
  color: black;
}

.tag_link:hover {
  background-color: #999;
}
</style>