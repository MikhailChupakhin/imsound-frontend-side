<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogTags.vue -->

<template>
  <div class="mt-2 border-1 border-round-sm surface-border">
    <div class="grid">
      <div class="col-2 flex align-items-center px-3 py-3 text-2xl">Тэги</div>
      <div class="col-10 flex align-items-center pt-3">
      <div class="tags flex flex-row flex-wrap gap-2">
        <NuxtLink
          v-for="(tag, index) in tags_data"
          :key="index"
          :to="`/catalog/tags/${tag.slug}`"
          class="tag_link"
        >
          {{ tag.name }}
        </NuxtLink>
      </div>
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
.tag_link {
  padding: 5px;
  margin-right: 3px;
  background-color: rgb(207, 228, 228);
  border-radius: 10px;
  border: 1px solid #eee;
  text-decoration: none;
  color: black;
}

.tag_link:hover {
  background-color: #999;
}</style>