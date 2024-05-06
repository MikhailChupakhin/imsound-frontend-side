<template>
  <div :id="sliderId" class="slider-container"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
  props: {
    priceInterval: Object,
    sliderId: String
  },
  setup(props, { emit }) {
    const slider = ref(null);

    onMounted(() => {
      const sliderElement = document.getElementById(props.sliderId);

      slider.value = noUiSlider.create(sliderElement, {
        start: [props.priceInterval.min, props.priceInterval.max],
        connect: true,
        range: {
          min: props.priceInterval.min,
          max: props.priceInterval.max
        },
        step: 1
      });
      const lowerHandle = document.querySelector('.noUi-handle-lower');
      const upperHandle = document.querySelector('.noUi-handle-upper');

      lowerHandle.setAttribute('aria-label', 'Нижняя граница цены');
      upperHandle.setAttribute('aria-label', 'Верхняя граница цены');
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
  height: 0.4rem;
}

.noUi-horizontal .noUi-handle {
  width: 1rem;
  height: 1rem;
  right: -0.5rem;
  top: -0.5rem;
}

.noUi-handle::after {
  content: none;
}

.noUi-handle::before {
  content: none;
}
</style>