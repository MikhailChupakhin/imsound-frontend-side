<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogFIlters.vue -->

<template>
    <div class="filters-container border m-5">
        <div class="text-center mb-4">
            <p class="text-lg font-semibold">Фильтры</p>
        </div>
        <div>
            <div class="flex flex-wrap">
                <div class="w-full md:w-1/2 px-2">
                    <div class="form-group">
                        <label for="min_price_value">От:</label>
                        <input type="number" v-model.number="minPrice" @input="updateSliderFromMin"
                            class="form-control custom-input" inputmode="numeric">
                    </div>
                </div>
                <div class="w-full md:w-1/2 px-2">
                    <div class="form-group">
                        <label for="max_price_value">До:</label>
                        <input type="number" v-model.number="maxPrice" @input="updateSliderFromMax"
                            class="form-control custom-input" inputmode="numeric">
                    </div>
                </div>
                <CatalogPriceSlider v-if="price_interval" :priceInterval="price_interval"
                    @sliderValuesChanged="handleSliderValuesChanged" ref="sliderRef" />
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
                    <p class="text-center font-semibold">Производители</p>
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
            <button @click="applyFilters" class="border m-5 p-2">Применить фильтр</button>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import CatalogPriceSlider from '~/components/catalog/PriceSlider.vue';

export default {
    components: {
        CatalogPriceSlider,
    },
    inject: ['manufacturers', 'price_interval'],
    setup() {


        const minPrice = inject('minPrice');
        const maxPrice = inject('maxPrice');
        const inStock = inject('inStock');
        const selectedManufacturers = inject('selectedManufacturers');
        const sliderRef = ref(null);
        const productsList = inject('products_list');
        const currentPage = inject('currentPage');
        const productsQuantity = inject('products_quantity');
        const APIpath = inject('APIpath');
        const APIqueryString = inject('APIqueryString');
        const selectedRowsPerPage = inject('selectedRowsPerPage');

        const applyFilters = async () => {
            // Лучше вынести в отдельную функцию
            let queryString = `?min_price_value=${minPrice.value}&max_price_value=${maxPrice.value}`;
            if (selectedManufacturers.value.length > 0) {
                const manufacturerNames = selectedManufacturers.value.map(manufacturer => manufacturer.name);
                queryString += `&manufacturer[]=${manufacturerNames.join('&manufacturer[]=')}`;
            }
            if (inStock.value) {
                queryString += '&in_stock=true';
            }
            //
            const BASE_API_URL = useRuntimeConfig().public.apiBase;
            APIpath.value = window.location.pathname.slice(1);
            APIqueryString.value = queryString;
            const apiUrl = BASE_API_URL + APIpath.value + '/' + queryString;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                productsList.value = data.results.product_list;
                productsQuantity.value = data.count;
                currentPage.value = 1;
                selectedRowsPerPage.value = 12;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const handleSliderValuesChanged = (values) => {
            minPrice.value = parseInt(values[0]);
            maxPrice.value = parseInt(values[1]);
        };

        const updateSliderFromMin = () => {
            sliderRef.value.slider.set([minPrice.value, null]);
        };

        const updateSliderFromMax = () => {
            sliderRef.value.slider.set([null, maxPrice.value]);
        };

        return {
            minPrice,
            maxPrice,
            inStock,
            selectedManufacturers,
            applyFilters,
            handleSliderValuesChanged,
            updateSliderFromMin,
            updateSliderFromMax,
            currentPage,
            sliderRef,
            APIpath,
            APIqueryString,
        };
    }

};
</script>

<style scoped></style>
