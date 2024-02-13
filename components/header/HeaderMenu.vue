<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderMenu.vue -->

<template>
  <NuxtLink :to="`/`" class="menu-button mr-5">Главная</NuxtLink>
  <div class="menu">
    <NuxtLink :to="`/catalog`" class="menu-button mr-5">Каталог</NuxtLink>
    <div class="dropdown-menu">
        <ul class="categories">
            <li class="category" v-for="category in categories" :key="category.id">
              <NuxtLink :to="`/catalog/${category.slug}`" class="dropdown-menu-item">{{ category.name }}</NuxtLink>
              <ul class="subcategories">
                <li v-for="subcategory in getSubcategories(category.name)" :key="subcategory.id">
                  <NuxtLink :to="`/catalog/${category.slug}/${subcategory.slug}`" class="dropdown-menu-item">{{ subcategory.name }}</NuxtLink>
                </li>
              </ul>
            </li>
        </ul>
    </div>
  </div>
  <NuxtLink :to="`/blog`" class="menu-button">Блог</NuxtLink>
</template>

<script>
export default {
  inject: ['categories', 'subcategories'],
  methods: {
    getSubcategories(categoryName) {
      const category = this.subcategories.find(subcategory => subcategory.category_name === categoryName);
      return category ? category.subcategories_pack : [];
    }
  }
};
</script>

<style scoped>
.menu {
    position: relative;
    display: inline-block;
}

.menu-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 24px;
    border: none;
    cursor: pointer;
}

.menu:hover .dropdown-menu {
    display: block;
}

.dropdown-menu {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    z-index: 1;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.categories {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.category {
    position: relative;
}

.category a {
    display: block;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
}

.category a:hover {
    background-color: #f1f1f1;
}

.subcategories {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    left: 100%;
    top: 0;
    z-index: 1;
}

.category:hover .subcategories {
    display: block;
}

.dropdown-menu-item {
    width: 300px;
}

.dropdown-menu-item:hover {
    background-color: #f1f1f1;
}
</style>
