<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\assemblies\SidebarBuiltin.vue -->

<template>
  <div class="sidebar-area unvisible-sidebar col-2">
    <CatalogFIlters sliderId="'priceSliderBuiltin'" />
    <SidebarNav />
  </div>
</template>

<script setup>
import SidebarNav from '~/components/catalog/SidebarNav.vue';
import CatalogFIlters from '~/components/catalog/CatalogFIlters.vue';

</script>

<style scoped>
.sidebar-area {
  margin-right: 0.3rem;
}
</style>