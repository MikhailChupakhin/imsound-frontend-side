<template>
  <h2>Популярные категории</h2>
  <div class="subcategories-carousel">
    <div class="carousel-container">
      <div class="carousel-inner">
        <div class="carousel-item" v-for="subcategory in subcategories" :key="subcategory.id">
          <div class="subcategory-image">
            <template v-if="isLoading">
                <Skeleton width="100%" :height="'130px'"></Skeleton>
            </template>
            <template v-else>
              <router-link :to="`/catalog/${subcategory.parent_category_slug}/${subcategory.slug}`">
                <NuxtImg :src="`${BASE_API_MEDIA}${subcategory.image}`" :alt="subcategory.name" />
              </router-link>
            </template>
          </div>
          <div class="subcategory-name">
            <router-link class="r-link":to="`/catalog/${subcategory.parent_category_slug}/${subcategory.slug}`">
              {{ subcategory.name }}
            </router-link>
          </div>
        </div>
      </div>
      <button class="carousel-btn carousel-prev" @click="prevSlide">
        <
      </button>
      <button class="carousel-btn carousel-next" @click="nextSlide">
        >
      </button>
    </div>
  </div>
  
</template>

<script setup>
import { loadImage } from '~/utils/func/loadImage';
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;
const props = defineProps({
  subcategories: {
    type: Array,
    required: true,
  },
});

let currentIndex = 0;
const itemsPerSlide = 6;

const prevSlide = () => {
  currentIndex = (currentIndex - 1 + props.subcategories.length) % props.subcategories.length;
  updateCarousel();
};

const nextSlide = () => {
  currentIndex = (currentIndex + 1) % props.subcategories.length;
  updateCarousel();
};

const updateCarousel = () => {
  const carouselInner = document.querySelector('.carousel-inner');
  const displayedSubcategories = props.subcategories.slice(
    (currentIndex + props.subcategories.length - (itemsPerSlide - 1)) % props.subcategories.length,
    (currentIndex + props.subcategories.length) % props.subcategories.length
  );
  carouselInner.style.transform = `translateX(-${(currentIndex % (props.subcategories.length - itemsPerSlide + 1)) * (120 / itemsPerSlide)}%)`;
};

const loadImages = () => {
  props.subcategories.forEach(subcategory => {
    loadImage(BASE_API_MEDIA + subcategory.image).then(() => {
      isLoading.value = false;
    }).catch(error => {
      console.error('Ошибка при загрузке изображения:', error);
    });
  });
};

const isLoading = ref(true);

onMounted(loadImages);
</script>

<style scoped>
.subcategories-carousel {
  width: 95%;
  margin: 0 auto;
  position: relative;
  overflow-x: hidden;
}

.carousel-container {
  display: flex;
  align-items: center;
}
.carousel-inner {
  display: flex;
  transition: transform 0.5s ease;
  width: 90%;
  margin: 0 1rem;
}
.carousel-item {
  flex: 0 0 16.6%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;
}
.subcategory-image {
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  border-radius: 8px;
}
.subcategory-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.subcategory-name {
  margin-top: 8px;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  padding: 0px 1rem;
  text-decoration: none;
  color: inherit;
}
.carousel-prev,
.carousel-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 24px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.carousel-btn {
  background-color: rgba(203, 235, 235, 0.509);
  border-radius: 50%;
}
.carousel-prev {
  left: 10px;
}

.carousel-next {
  right: 10px;
}

.r-link {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>