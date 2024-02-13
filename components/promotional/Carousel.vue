<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\promotional\Carousel.vue -->

<template>
    <div class="carousel-container relative">
      <div class="carousel">
        <div v-for="(slide, index) in sliders" :key="slide.id" :class="getSlideClasses(index)">
          <img :src="'https://imsound.ru' + slide.image" :alt="slide.alt_text" class="w-full" />
          <div class="carousel-caption absolute bottom-0 left-0 w-full p-4">
            <h2 class="text-xl font-bold">{{ slide.title }}</h2>
            <p class="text-sm">{{ slide.subtitle }}</p>
          </div>
        </div>
      </div>
      <button class="prev" @click="prevSlide">&#10094;</button>
      <button class="next" @click="nextSlide">&#10095;</button>
    </div>
</template>
  
<script setup>
  import { inject, ref } from 'vue';
  
  const sliders = inject('sliders', []);
  const currentSlideIndex = ref(0);
  
  function getSlideClasses(index) {
    return {
      hidden: index !== currentSlideIndex.value,
      block: index === currentSlideIndex.value
    };
  }
  
  function nextSlide() {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % sliders.length;
  }
  
  function prevSlide() {
    currentSlideIndex.value = (currentSlideIndex.value - 1 + sliders.length) % sliders.length;
  }
</script>
  
<style scoped>
.carousel-container {
  max-width: 100vw;
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  width: 100%;
  height: 300px;
  overflow-y: hidden;
}

.carousel img {
  scroll-snap-align: start;
  width: 100%;
  object-fit: cover;
}

.carousel-caption {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}

.prev, .next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
}

.prev {
  left: 0;
}

.next {
  right: 0;
}
</style>