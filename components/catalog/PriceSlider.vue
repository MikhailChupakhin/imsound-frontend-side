<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\PriceSlider.vue -->

<template>
    <div id="slider" class="slider-container mt-5 mb-5"></div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import noUiSlider from 'nouislider';
  import 'nouislider/dist/nouislider.css';
  
  export default {
    props: {
      priceInterval: Object
    },
    setup(props, { emit }) {
      const slider = ref(null);
  
      onMounted(() => {
        const sliderElement = document.getElementById('slider');
  
        slider.value = noUiSlider.create(sliderElement, {
          start: [props.priceInterval.min, props.priceInterval.max],
          connect: true,
          range: {
            min: props.priceInterval.min,
            max: props.priceInterval.max
          },
          step: 1
        });
  
        slider.value.on('update', (values, handle) => {
          emit('sliderValuesChanged', values);
        });
      });
  
      return { slider };
    }
  }
  </script>
  
  <style>
  .slider-container {
    width: 100%;
    height: 5px;
  }
  
  .noUi-horizontal .noUi-handle {
      width: 16px;
      height: 16px;
      right: -8px;
      top: -8px;
  }
  </style>