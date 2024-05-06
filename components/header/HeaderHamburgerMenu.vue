<template>
    <div class="unvisible-md-lg">
        <svg class="svg-icon-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#000" stroke-width=".6"
            fill="rgba(0,0,0,0)" stroke-linecap="round" style="cursor: pointer" @click="toggleMenu">
            <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"> 
            </path>
        </svg>
        <div v-show="showMenu" v-body-lock="showMenu" class="menu-container-expanded">
            <div class="menu bg-white shadow-md z-10">
                <div class="flex flex-row">
                    <NuxtLink :to="`/`" class="menu-item">Главная</NuxtLink>
                    <NuxtLink :to="`/catalog`" class="menu-item">Каталог</NuxtLink>
                    <NuxtLink :to="`/blog`" class="menu-item">Блог</NuxtLink>
                </div>
                <div @click="toggleMenu" id="closeMenu" class="auth-menu-close" role="button" tabindex="0" aria-label="Закрыть меню">закрыть меню</div>
                <SidebarNav />
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
    },
    mounted() {
      watchEffect(() => {
        if (this.showMenu) {
          document.body.classList.add('body-locked');
        } else {
          document.body.classList.remove('body-locked');
        }
      });
    },
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
  height: 99%;  
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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.auth-menu-close:hover {
  background-color: #f0f0f0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>