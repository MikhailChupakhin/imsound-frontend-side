<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\assemblies\SidebarBuiltin.vue -->

<template>
  <div class="sidebar-area unvisible-sm col-2">
    <SidebarNav />
    <CatalogFIlters sliderId="'priceSliderBuiltin'" />
  </div>
</template>

<script setup>
import SidebarNav from '~/components/catalog/SidebarNav.vue';
import CatalogFIlters from '~/components/catalog/CatalogFIlters.vue';

</script>