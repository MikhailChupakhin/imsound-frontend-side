<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderHamburgerMenu.vue -->

<template>
    <div class="unvisible-md-lg">
        <svg class="svg-icon-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#000" stroke-width=".6"
            fill="rgba(0,0,0,0)" stroke-linecap="round" style="cursor: pointer" @click="toggleMenu">
            <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate dur="0.3s" attributeName="d"
                    values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze"
                    begin="start.begin" />
                <animate dur="0.3s" attributeName="d"
                    values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze"
                    begin="closeMenu.click" />
            </path>
            <rect width="10" height="10" stroke="none">
                <animate dur="2s" id="reverse" attributeName="width" begin="click" />
            </rect>
            <rect width="10" height="10" stroke="none">
                <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" begin="click" />
                <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
            </rect>
        </svg>
        <div v-show="showMenu" class="menu-container-expanded">
            <div class="menu bg-white shadow-md z-10">
                <NuxtLink :to="`/`" class="menu-item">Главная</NuxtLink>
                <NuxtLink :to="`/catalog`" class="menu-item">Каталог</NuxtLink>
                <NuxtLink :to="`/`" class="menu-item">Блог</NuxtLink>
                <SidebarNav />
                <a @click="toggleMenu" id="closeMenu" class="auth-menu-close">Закрыть меню</a>
            </div>
        </div>
    </div>
</template>

<script>
import SidebarNav from '~/components/catalog/SidebarNav.vue';

export default {
    data() {
        return {
            showMenu: false
        }
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
    },
    components: {
        SidebarNav
    }
}
</script>
  
<style scoped>
html, body {
  background: #000;
}

.hb {
  width: 2rem;
  margin: 0 auto;
  display: block;
}

.unvisible-md-lg {
    position: relative;
}

.menu-container-expanded {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.menu {
  width: 20rem;
  background-color: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.menu-item {
  padding: 8px 16px;
  display: block;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.auth-menu-close {
  margin-top: 1rem;
  display: block;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  text-align: center;
  cursor: pointer;
}
</style>