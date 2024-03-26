<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\SidebarAside.vue -->

<template>
    <div class="sidebar-area unvisible-md-lg">
        <aside class="aside-view">
            <div class="sidebar-content flex flex-row">
                <div class="sidebar-left">
                    <SidebarNav />
                    <CatalogFIlters sliderId="'priceSliderAside'" />
                </div>
                <div class="sidebar-right flex align-self-center align-items-center justify-content-center ml-5">
                    <div class="toggle-sidebar-button" @click="toggleSidebar"><img src="/static/svg/chevron-aside.svg"
              class="svg-icon-xl" alt="Меню навигации и фильтрации"></div>
                </div>
            </div>
        </aside>
    </div>
</template>

  
<script setup>

import SidebarNav from '~/components/catalog/SidebarNav.vue';
import CatalogFIlters from '~/components/catalog/CatalogFIlters.vue';

const isAsideView = ref(false);

const toggleSidebar = () => {
    isAsideView.value = !isAsideView.value;

    const toggleButton = document.querySelector('.toggle-sidebar-button');
    toggleButton.classList.toggle('rotate', isAsideView.value);

    if (isAsideView.value) {
        setTimeout(() => {
            document.querySelector('.aside-view').classList.add('show');
        }, 50);
    } else {
        document.querySelector('.aside-view').classList.remove('show');
    }
};

</script>

<style scoped>
.sidebar-area {
    max-height: 100%;
    overflow-y: auto;
}
.sidebar-left {
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.sidebar-right  {
    background-color: transparent;
}
.aside-view {
    position: fixed;
    top: 100px;
    bottom: 0;
    left: -270px;
    width: 300px;
    
    z-index: 999;
    transition: left 0.5s ease;

}
.aside-view.show {
    left: 0;
}

.toggle-sidebar-button {
    transition: transform 0.3s ease;
}

.toggle-sidebar-button.rotate {
    transform: rotate(180deg);
}
</style>