<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\index\SlidersCarousel.vue -->

<template>
  <div class="slides-wrapper" ref="slidesWrapper">
    <template v-if="isLoading">
      <Skeleton width="100%" height="150px"></Skeleton>
    </template>
    <template v-else>
      <Galleria ref="galleria" :value="sliders" :numVisible="5" containerStyle="max-width: 100%" :showThumbnails="false" :showIndicators="false" :circular="true" :autoPlay="true" :transitionInterval="100000" >
        <template #item="slotProps">
          <div class="slider-item">
            <div class="slider-media" :style="{ 'background-image': getBackgroundImage(slotProps.item) }">
            <div class="slider-content">
              <div class="flex align-items-center justify-content-center slider-title">{{ slotProps.item.title }}</div>
              <a :href="slotProps.item.button_link" class="flex align-items-center justify-content-center slider-button">
                {{ slotProps.item.button_text }}
              </a>
            </div>
          </div>
          </div>
        </template>
      </Galleria>
    </template>
  </div>
</template>

<script setup>
import Skeleton from 'primevue/skeleton';
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;
const slidesWrapper = ref(null);
const galleria = ref(null);

const props = defineProps({ sliders: Array });
const isReady = ref(false);

onMounted(() => {
  preloadImagesForFirstSlider();
});

// Функция загрузки изображений первого слайдера
const preloadImagesForFirstSlider = async () => {
  const firstSliderImages = props.sliders[0].images;
  const imageValues = Object.values(firstSliderImages);

  const imagePromises = imageValues.map((image) => loadImage(BASE_API_MEDIA + image));
  await Promise.all(imagePromises);
  isReady.value = true;
};

const isLoading = computed(() => {
  return props.sliders.length === 0 || !isReady.value;
});

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

const getBackgroundImage = (item) => {
  if (window.matchMedia("(min-width: 824px)").matches) {
    return `url(${BASE_API_MEDIA + item.images.image_lg})`;
  } else if (window.matchMedia("(min-width: 401px) and (max-width: 823px)").matches) {
    return `url(${BASE_API_MEDIA + item.images.image_md})`;
  } else {
    return `url(${BASE_API_MEDIA + item.images.image_sm})`;
  }
}


// // Обработчик события resize для отслеживания изменений размеров окна
// window.addEventListener('resize', () => {
//   if (slidesWrapper.value) {
//     const width = slidesWrapper.value.offsetWidth;
//     if (width >= 824) {
//       console.log('>824')
//       sizeBackgroundImage.value = 'lg';
//     } else if (width >= 401 && width <= 823) {
//       console.log('401>823')
//       sizeBackgroundImage.value = 'md';
//     } else {
//       console.log('<400>')
//       sizeBackgroundImage.value = 'sm';
//     }
//   }
// });

</script>

<style scoped>
.slides-wrapper {
  flex: auto;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
  margin-top: 5.1rem;
}

.slider-media {
  width: 100%;
  height: 150px;
  overflow: hidden;
  z-index: 2;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media screen and (max-width: 540px) {
    .slides-wrapper {
      margin-top: 4.2rem;
    }
}
.slider-item {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.slider-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.slider-title {
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
}

.slider-button {
  text-decoration: none;
  margin-top: 1rem;
  padding: 0.3rem 0.8rem;
  font-size: 1.5rem;
  background-color: rgba(246, 161, 23, 0.765);
  color: #000000;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  max-width: 18rem;
}

.slider-button:hover {
  background-color: rgb(192, 115, 8);
}
</style>