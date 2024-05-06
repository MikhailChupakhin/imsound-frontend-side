<template>
  <div class="banners-container mt-5">
    <div class="small-banner" :style="{ backgroundImage: 'url(' + BASE_API_MEDIA + banners[0].image + ')' }">
      <a class="banner-link">
        <div class="banner-content">
          <h3 class="banner-title">{{ banners[0].name }}</h3>
          <p class="banner-description">{{ banners[0].description }}</p>
        </div>
      </a>
    </div>
    <div class="large-banner" :style="{ backgroundImage: 'url(' + BASE_API_MEDIA + banners[1].image + ')' }">
      <a class="banner-link">
        <div class="banner-content">
          <h3 class="banner-title">{{ banners[1].name }}</h3>
          <p class="banner-description">{{ banners[1].description }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  banners_top: Array,
});
const banners = props.banners_top
const config = useRuntimeConfig();
const BASE_API_MEDIA = config.public.apiMedia;
</script>

<style scoped>
.banners-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.small-banner {
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
}

.large-banner {
  height: 400px;
  width: 100%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
}

@media (min-width: 867px) {
  .small-banner {
    max-width: 33%;
  }

  .large-banner {
    max-width: 63%;
  }
}

.banner-link {
  text-decoration: none;
  color: inherit;
}

.banner-content {
  padding: 10px;
  color: #f0f0f0;
}

@media (min-width: 768px) {
  .banner-item {
    max-width: 48%;
  }
}
</style>