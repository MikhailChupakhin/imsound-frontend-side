<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderMenu.vue -->

<template>
  <div class="unvisible-sm">
    <div class="menu">
      <NuxtLink :to="`/catalog`" class="menu-button mr-5">Каталог</NuxtLink>
      <div class="dropdown-menu">
        <ul class="categories">
          <li class="category" v-for="category in categories" :key="category.id">
            <NuxtLink :to="`/catalog/${category.slug}`" class="dropdown-menu-item">{{ category.name }}</NuxtLink>
            <ul class="subcategories">
              <li v-for="subcategory in getSubcategories(category.slug)" :key="subcategory.id">
                <NuxtLink :to="`/catalog/${category.slug}/${subcategory.slug}`" class="dropdown-menu-item">{{ subcategory.name }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <NuxtLink :to="`/`" class="menu-button mr-5">Главная</NuxtLink>
    <NuxtLink :to="`/blog`" class="menu-button">Блог</NuxtLink>
  </div>
</template>

<script>
export default {
  inject: ['categories', 'subcategories'],
  methods: {
    getSubcategories(categorySlug) {
      const subcategories = Array.from(this.subcategories).flatMap(obj => obj.subcategories_pack);
      const filteredSubcategories = subcategories.filter(subcategory => subcategory.parent_category_slug === categorySlug);
      return filteredSubcategories;
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
    font-size: 1.2rem;
    font-weight: 750;
    color: rgb(118, 118, 118);
    padding: 10px 10px;
    text-decoration: none;
}
.menu-button:hover {
  text-shadow: 0 0 1px #8B0000, 0 0 1px #8B0000;
  color: #8B0000;
}
.dropdown-menu-item:hover {
  text-shadow: 0 0 1px #8B0000, 0 0 1px #8B0000;
  color: #8B0000;
}
.menu:hover .dropdown-menu {
    display: block;
}
.dropdown-menu {
    display: none;
    position: absolute;
    background-color: #efefef;
    border-radius: 3px;
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
    background-color: #dadada;
}
.subcategories {
    display: none;
    position: absolute;
    background-color: #efefef;
    border-radius: 3px;
    min-width: 160px;
    left: 100%;
    top: 0;
    z-index: 1;
    list-style: none;
    padding: 0;
}
.category:hover .subcategories {
    display: block;
}
.dropdown-menu-item:hover {
    background-color: #dadada;
}
</style>
