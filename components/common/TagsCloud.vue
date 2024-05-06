<template>
  <div class="grid align-items-center">
    <div class="tags-list col-10 md:col-11 lg:col-11 flex align-items-center">
      <div class="tags flex flex-row flex-wrap gap-1">
        <NuxtLink v-for="(tag, index) in tags_data" :key="index" :to="linkPath + tag.slug" class="tag-link" :class="{ 'active-tag': tag.slug === activeTag }">
          {{ tag.name.toLowerCase() }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    linkPath: {
      type: String,
    },
    activeTag: {
      type: String,
      required: false,
    },
  },
  inject: ['tags_data'],
  methods: { isActive(tag) {
    if (activeTag == tag) {
      return true;
    }
  }

},
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

.tag-link {
  padding: 0.2rem 0.4rem;
  margin-right: 0.2rem;
  background-color: rgb(236, 236, 236);
  border-radius: 0.8rem;
  border: 1px solid #eee;
  text-decoration: none;
  color: black;
}

.tag-link:hover {
  background-color: #999;
}
.active-tag {
  background-color: rgba(246, 160, 23);
}
</style>