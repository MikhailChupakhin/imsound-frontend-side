<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\components/index/SubcategoriesCarousel.vue.vue -->

<template>
    <Carousel :value="subcategories" :numVisible="5" :numScroll="1" :responsiveOptions="responsiveOptions" circular>
        <template #item="slotProps">
            <div class="border-1 surface-border border-round m-2 p-3">
                <div class="mb-3">
                    <div class="relative mx-auto">
                        <img :src="BASE_API_MEDIA + slotProps.data.image" :alt="slotProps.data.name" class="w-full border-round" />
                        <!-- <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" class="absolute" style="left:5px; top: 5px"/> -->
                    </div>
                </div>
                <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
            </div>
        </template>
    </Carousel>    
    </template>
    
    <script setup>
    import Carousel from 'primevue/carousel';
    import { formatPrice } from '~/utils/priceFormatter.js';
    const config = useRuntimeConfig();
    const BASE_API_MEDIA = config.public.apiMedia;

    const props = defineProps({
        subcategories: Object,
    });
    
    const responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 5,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 5,
        numScroll: 1
      }
    ];
    </script>
    
    <style scoped>
    
    </style>