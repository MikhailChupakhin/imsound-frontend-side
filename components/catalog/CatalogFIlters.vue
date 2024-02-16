<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogFIlters.vue -->

<template>
    <div class="filters-container m-5">
        <div class="text-center mb-4">
            <p class="text-lg font-semibold">Фильтры</p>
        </div>
        <div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 px-2">
                    <div class="form-group">
                        <label for="min_price_value">От:</label>
                        <input type="number" v-model="minPrice"  @input="updateSliderFromMin" class="form-control custom-input">
                    </div>
                </div>
                <div class="w-full md:w-1/2 px-2">
                    <div class="form-group">
                        <label for="max_price_value">До:</label>
                        <input type="number" v-model="maxPrice" @input="updateSliderFromMax" class="form-control custom-input">
                    </div>
                </div>
                <CatalogPriceSlider v-if="price_interval" :priceInterval="price_interval" @sliderValuesChanged="handleSliderValuesChanged" ref="slider"/>
            </div>

            <div class="flex">
                <div class="w-full px-2">
                    <div class="form-group form-check availability">
                        <input type="checkbox" v-model="inStock" class="form-check-input">
                        <label class="form-check-label">Только в наличии</label>
                    </div>
                </div>
            </div>

            <div class="flex">
                <div class="w-full px-2">
                    <p>Производители</p>
                    <ul class="list-group list-group-flush manufacturer-list">
                        <li v-for="(manufacturer, index) in manufacturers" :key="index" class="list-group-item">
                            <input type="checkbox" v-model="selectedManufacturers" :value="manufacturer"
                                class="form-check-input">
                            <label>{{ manufacturer.name }}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="filter-btn text-center">
            <button @click="applyFilters" class="btn btn-primary">Применить фильтр</button>
        </div>
    </div>
</template>
  
<script>
import CatalogPriceSlider from '~/components/catalog/PriceSlider.vue';

export default {
    components: {
        CatalogPriceSlider
    },
    inject: ['manufacturers', 'price_interval'],
    data() {
        return {
            minPrice: '',
            maxPrice: '',
            inStock: false,
            selectedManufacturers: [],
        };
    },
    methods: {
        applyFilters() {
            console.log('Applying filters...');
            console.log('Min Price:', this.minPrice);
            console.log('Max Price:', this.maxPrice);
            console.log('In Stock:', this.inStock);
            console.log('Selected Manufacturers:', this.selectedManufacturers);
        },
        handleSliderValuesChanged(values) {
            this.minPrice = values[0];
            this.maxPrice = values[1];
        },
        updateSliderFromMin() {
            this.$refs.slider.slider.set([this.minPrice, null]);
        },
        updateSliderFromMax() {
            this.$refs.slider.slider.set([null, this.maxPrice]);
        }
    }
};
</script>

<style scoped>
.filters-container {
    border: 1px solid black;
}
</style>


