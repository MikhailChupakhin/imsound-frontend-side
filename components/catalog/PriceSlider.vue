<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\PriceSlider.vue -->

<template>
    <div id="slider" class="slider-container mt-5 mb-5"></div>
</template>
  
<script>
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
    props: {
        priceInterval: Object
    },
    data() {
        return {
            slider: null
        };
    },
    mounted() {
        const sliderElement = document.getElementById('slider');

        this.slider = noUiSlider.create(sliderElement, {
            start: [this.priceInterval.min, this.priceInterval.max],
            connect: true,
            range: {
                'min': this.priceInterval.min,
                'max': this.priceInterval.max
            }
        });

        this.slider.on('update', (values, handle) => {
            this.$emit('sliderValuesChanged', values);
        });
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