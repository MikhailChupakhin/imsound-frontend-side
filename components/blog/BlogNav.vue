<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\blog\BlogNav.vue -->

<template>
  <Dropdown v-model="selectedCategory" :options="categories" optionLabel="name" placeholder="выбрать категорию"
    checkmark :highlightOnSelect="false" class="w-full" @change="handleCategoryChange" />
</template>

<script setup>

const emit = defineEmits(['categoryChanged']);

const { blogCategories } = defineProps({
  blogCategories: {
    type: Array,
    required: true
  }
});

const categories = computed(() => {
  return blogCategories.map(category => ({
    id: category.id,
    name: category.title,
    slug: category.slug,
  }));
});

const selectedCategory = ref(null);

const handleCategoryChange = (category) => {
  emit('categoryChanged', category.value);
};

</script>

<style></style>
