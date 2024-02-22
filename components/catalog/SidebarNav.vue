<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\SidebarNav.vue -->

<template>
  <div class="sidebar-nav">
    <div v-for="(category, index) in categories" :key="index">
      <div class="category">
        <NuxtLink :to="`/catalog/${category.slug}`" class="category-name" @click="toggleCategory(index)">{{ category.name
        }}</NuxtLink>
        <div class="arrow-container" @click="toggleSubcategories(index)">
          <div class="arrow" :class="{ open: isSubcategoryOpen(index) }"><img src="/static/svg/chevron.svg"
              class="svg-icon-l chevron" alt="Раскрывающийся список"></div>
        </div>
      </div>
      <div v-if="isSubcategoryOpen(index)" class="subcategories">
        <div v-for="(subcategory, subIndex) in getSubcategories(category.name)" :key="subIndex" class="subcategory">
          <NuxtLink :to="`/catalog/${category.slug}/${subcategory.slug}`" class="subcategory-name">{{ subcategory.name }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  inject: ['categories', 'subcategories'],
  data() {
    return {
      openSubcategories: [],
    };
  },
  methods: {
    toggleSubcategories(index) {
      if (this.isSubcategoryOpen(index)) {
        this.openSubcategories = this.openSubcategories.filter(i => i !== index);
      } else {
        this.openSubcategories.push(index);
      }
    },
    isSubcategoryOpen(index) {
      return this.openSubcategories.includes(index);
    },
    getSubcategories(categoryName) {
      const category = this.subcategories.find(subcategory => subcategory.category_name === categoryName);
      return category ? category.subcategories_pack : [];
    },
  }
};
</script>
  
<style scoped>
.category {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.arrow-container {
  min-width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subcategories {
  padding-left: 20px;
}

.subcategory {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.category-name,
.subcategory-name {
  font-weight: 700;
  color: #767676;
  text-decoration: none;
}

.category-name:hover,
.subcategory-name:hover {
  text-shadow: 0 0 1px #8B0000, 0 0 1px #8B0000;
  color: #8B0000;
  font-weight: 700;
}

.chevron {
  transition: all 0.3s ease;
}

.chevron:hover {
  filter: drop-shadow(0 0 1px #8B0000) drop-shadow(0 0 1px #8B0000);
  fill: #8B0000;
}
.open .chevron {
  transform: rotate(180deg);
}
</style>