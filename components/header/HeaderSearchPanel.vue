<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderSearchPanel.vue  -->

<template>
  <div class="search">
    <div class="search_icon" @click="toggleSearchMenu">
      <svg width="2.5rem" height="2.5rem" enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
    </div>
    <div class="search-menu" :class="{ 'show': isMenuOpen }">
      <input class="search-input" type="text" placeholder="Введите запрос">
      <CommonInterfaceButton buttonText="Поиск" @click="search" />
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleSearchMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    search() {
      // Логика поиска
    }
  }
};
</script>

<style scoped>

.search_icon {
  margin-right: 10px;
  fill: #333;
  width: 30px;
  height: 30px
}

.search_icon svg {
  fill: black;
  -webkit-transition: all .2s ease;
  -moz-transition: all .2s ease;
  -ms-transition: all .2s ease;
  -o-transition: all .2s ease;
  transition: all .2s ease
}

.search_icon:hover svg {
  fill: #8B0000;
}

.search-menu {
  margin-top: 1rem;
  position: absolute;
  top: auto;
  right: auto + 20px;
  display: none;
  background-color: rgb(188, 180, 192);
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 0.4rem;
  z-index: 1000;
}

.search-input {
  max-width: 10rem;
  border-radius: 5px;
  border-color: transparent;
  font-size: 1.2rem;
}

.search-menu.show {
  display: block;
}
</style>