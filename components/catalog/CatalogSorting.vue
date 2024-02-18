<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\CatalogSorting.vue -->

<template>
    <div class="border mt-5">
        <div class="sorting-wrapper border">
            <div class="view-mode-buttons">
                <a @click="setGridViewMode">
                    <i class="fa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z" />
                        </svg></i>
                </a>
                <a @click="setListViewMode">
                    <i class="fa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path
                                d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z" />
                        </svg></i>
                </a>
            </div>
            <div class="products_quantity">
                Всего товаров: {{ productsQuantity }}
            </div>
            <div class="sorting">
                <select class="border mr-5" v-model="sortingOption">
                    <option value="">По умолчанию</option>
                    <option value="name_asc">По названию (А-Я)</option>
                    <option value="name_desc">По названию (Я-А)</option>
                    <option value="price_asc">По цене (возрастание)</option>
                    <option value="price_desc">По цене (убывание)</option>
                </select>
                <button class="border" @click="sortProducts">Сортировать</button>
            </div>
        </div>
    </div>
</template>
  
<script>
import { computed, inject } from 'vue';

export default {
    setup() {
        const { emit } = getCurrentInstance();
        const minPrice = inject('minPrice');
        const maxPrice = inject('maxPrice');
        const inStock = inject('inStock');
        const selectedManufacturers = inject('selectedManufacturers');
        const productsList = inject('products_list');
        const productsQuantity = inject('products_quantity');
        const sortingOption = ref('');

        const sortingOptionValue = computed(() => {
            switch (sortingOption.value) {
                case 'name_asc':
                    return 'name';
                case 'name_desc':
                    return '-name';
                case 'price_asc':
                    return 'price';
                case 'price_desc':
                    return '-price';
                default:
                    return '';
            }
        });

        const setGridViewMode = () => {
            console.log('grid clicked');
            emit('update:viewMode', 'grid');
        };

        const setListViewMode = () => {
            console.log('list clicked');
            emit('update:viewMode', 'list');
        };

        const sortProducts = async() => {
            const sortParam = sortingOptionValue.value ? `&sort=${sortingOptionValue.value}` : '';


            // Нужно вынести в отдельную функцию
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
            const apiUrl = BASE_API_URL + 'catalog/' + queryString + sortParam;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                console.log(data.results.product_list)
                productsList.value = data.results.product_list;
                productsQuantity.value = data.count;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        return {
            minPrice,
            maxPrice,
            inStock,
            selectedManufacturers,
            productsQuantity,
            sortingOption,
            productsList,
            setGridViewMode,
            setListViewMode,
            sortProducts
        };
    }
};
</script>
  
<style scoped>
.sorting-wrapper {
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.view-mode-buttons {
    display: flex;
    align-items: center;
}

.view-mode-buttons a {
    margin-right: 10px;
}

.view-mode-buttons svg {
    height: 1em;
}

</style>