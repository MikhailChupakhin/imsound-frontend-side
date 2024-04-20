<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\ProductCarousel.vue -->

<template>
<Carousel :value="products" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions" circular :autoplayInterval="5000">
    <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2  p-3">
            <div class="mb-3">
                <div class="relative mx-auto">
                    <img :src="BASE_API_MEDIA + slotProps.data.image" :alt="slotProps.data.name" class="w-full border-round" />
                </div>
            </div>
            <div class="mb-3 font-medium">{{ slotProps.data.name }}</div>
            <div class="flex justify-content-between align-items-center">
                <div class="mt-0 font-semibold text-xl">{{ formatPrice(slotProps.data.price) }}</div>
                <span>
                    <Button class="ml-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        xml:space="preserve"
                        version="1.1"
                        viewBox="0 0 382 468.75"
                        x="0px"
                        y="0px"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        width="20"
                        height="20"
                    >
                        <path class="fil0" d="M171 298c21,0 39,17 39,39 0,21 -18,38 -39,38 -21,0 -39,-17 -39,-38 0,-22 18,-39 39,-39zm0 20c-11,0 -19,8 -19,19 0,10 8,18 19,18 10,0 19,-8 19,-18 0,-11 -9,-19 -19,-19z"/><path class="fil0" d="M292 298c21,0 39,17 39,39 0,21 -18,38 -39,38 -21,0 -39,-17 -39,-38 0,-22 18,-39 39,-39zm0 20c-10,0 -19,8 -19,19 0,10 9,18 19,18 10,0 19,-8 19,-18 0,-11 -9,-19 -19,-19z"/><path class="fil0" d="M11 0l67 15c4,1 6,3 7,7l16 76 273 0c5,0 9,5 8,11l-37 132c-1,4 -4,6 -8,6l-205 0 4 22 198 0c11,0 11,20 0,20l-207 0c-4,0 -8,-3 -9,-7l-51 -249 -60 -13c-12,-3 -7,-22 4,-20zm94 118l22 109 202 0 30 -109 -254 0z"/>
                    </svg>
                    </Button>
                </span>
            </div>
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
    products: Object,
});

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
];
</script>

<style scoped>

</style>