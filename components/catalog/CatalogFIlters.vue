<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogFIlters.vue -->

<template>
    <div class="filters-container">
        <div class="text-center">
            <p class="text-lg font-semibold">Фильтры</p>
        </div>
        <div>
            <div class="grid">
                <div class="input-field">
                    <div class="form-group">
                        <label for="min_price_value">От:</label>
                        <input type="text" v-model.number="formattedMinPrice" @input="updateSliderFromMin($event)"
                            class="form-control min-price-input" inputmode="numeric" style="width: 100%;" aria-label="Минимальная цена">
                    </div>
                </div>
                <div class="input-field">
                    <div class="form-group">
                        <label for="max_price_value">До:</label>
                        <input type="text" v-model.number="formattedMaxPrice" @input="updateSliderFromMax($event)"
                            class="form-control" inputmode="numeric" style="width: 100%;" aria-label="Максимальная цена">
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="p-slider">
                    <CatalogPriceSlider v-if="price_interval" :priceInterval="price_interval" :sliderId="sliderId"
                        @sliderValuesChanged="handleSliderValuesChanged" ref="sliderRef" />
                </div>
            </div>
            <div class="flex justify-content-between">
                <label class="form-check-label">Только в наличии</label>
                <div class="form-group">
                    <input type="checkbox" v-model="inStock" class="form-check-input">
                </div>
            </div>

            <div class="grid">
                <div class="col-12">
                    <p class="text-center font-semibold">Производители</p>
                    <ul class="manufacturers-list">
                        <li v-for="(manufacturer, index) in manufacturers" :key="index" class="list-group-item">
                            <input type="checkbox" v-model="selectedManufacturers" :value="manufacturer"
                                class="form-check-input">
                            <label>{{ manufacturer.name }}</label>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="text-center mb-2">
            <CommonInterfaceButton buttonText="применить" @click="applyFilters" :customStyle="{ width: '100%' }" />
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import CatalogPriceSlider from '~/components/catalog/PriceSlider.vue';
import { formatPriceShort } from '~/utils/priceFormatter.js';

export default {
    props: {
        closeMenu: {
            type: Function,
            default: () => null
        },
        sliderId: String,
    },
    components: {
        CatalogPriceSlider,
    },
    inject: ['manufacturers', 'price_interval'],
    setup(props) {
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
            let queryString = `?min_price_value=${minPrice.value}&max_price_value=${maxPrice.value}`;
            if (selectedManufacturers.value.length > 0) {
                const manufacturerNames = selectedManufacturers.value.map(manufacturer => manufacturer.name);
                queryString += `&manufacturer[]=${manufacturerNames.join('&manufacturer[]=')}`;
            }
            if (inStock.value) {
                queryString += '&in_stock=true';
            }

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
                if (typeof props.closeMenu === 'function') {
                    props.closeMenu();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const handleSliderValuesChanged = (values) => {
            minPrice.value = parseInt(values[0]);
            maxPrice.value = parseInt(values[1]);
        };

        const updateSliderFromMin = (event) => {
            const input = event.target.value;
            const filteredValue = input.replace(/\D/g, '');
            minPrice.value = parseInt(filteredValue);
            sliderRef.value.slider.set([minPrice.value, null]);
        };

        const updateSliderFromMax = () => {
            const input = event.target.value;
            const filteredValue = input.replace(/\D/g, '');
            maxPrice.value = parseInt(filteredValue);
            sliderRef.value.slider.set([null, maxPrice.value]);
        };

        const formattedMinPrice = computed(() => {
            return formatPriceShort(minPrice.value);
        });

        const formattedMaxPrice = computed(() => {
            return formatPriceShort(maxPrice.value);
        });

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
            formattedMinPrice,
            formattedMaxPrice,
        };
    },
};
</script>

<style scoped>
.grid {
    margin-right: 0rem;
    margin-left: 0rem;
}
.input-field {
    width: 50%;
}
.p-slider {
    width: calc(100% - 1rem);
    text-align: center;
    margin: 1.5rem auto 1rem;
}
.form-group {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
}
.form-group label {
    margin-bottom: 5px;
}
.form-group input[type="text"] {
    text-align: center;
    color: #8B0000;
}
.p-inputnumber,
.p-inputtext {
    max-width: 73px !important;
}
.min-price-input {
    margin-right: 0.6rem;
}
</style>

<style>
ul.manufacturers-list {
    list-style-type: none;
    padding-left: 0;
}
.form-check-input {
    min-width: 1rem;
    min-height: 1rem;
}
</style>
