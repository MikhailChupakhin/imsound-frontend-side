<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\common\PaginationBar.vue -->

<template>
    <Paginator class="m-5" :template="{
        '640px': 'PrevPageLink PageLinks NextPageLink',
        '960px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
        '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown',
        default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
    }" :rows="selectedRowsPerPage || 12" :totalRecords="totalRecords || 0" :rowsPerPageOptions="[12, 18, 36, 99]"
        @click="handleClick" @change="handleChangeRowsPerPage">
    </Paginator>
</template>
  
<script>

import { ref } from 'vue';
import Paginator from 'primevue/paginator';

export default {
    components: {
        Paginator,
    },
    setup() {
        const productsQuantity = inject('products_quantity');
        const productsList = inject('products_list');
        const selectedRowsPerPage = inject('selectedRowsPerPage');

        // NOTE: При текущей реализации API бэкенда, которое отдает URL страниц пагинации(previous и next) не используются.
        // Если оставим +- так как сделал - заменю их в API просто на номер текущей страницы.

        const APIpath = inject('APIpath');
        const APIqueryString = inject('APIqueryString');
        const currentPage = inject('currentPage');
        const totalRecords = ref(productsQuantity.value);
        const TESTselectedRowsPerPage = ref(selectedRowsPerPage.value);
        const previousRowsPerPage = ref();
        
        watch(productsQuantity, (newValue) => {
            // console.log('TOTAL RECORDS', totalRecords)
            totalRecords.value = newValue;
        });

        watch(selectedRowsPerPage, (newValue) => {
            TESTselectedRowsPerPage.value = newValue;
        });
        
        onMounted(() => {
            selectedRowsPerPage.value = 12;
            previousRowsPerPage.value = 12;
            const dropdownLabel = document.querySelector('.p-dropdown-label');

            const observer = new MutationObserver(mutationsList => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList' || mutation.type === 'characterData') {
                        const newValue = parseInt(dropdownLabel.innerText);
                        if (!isNaN(newValue) && !isNaN(previousRowsPerPage.value) && newValue !== previousRowsPerPage.value) {
                            selectedRowsPerPage.value = newValue;
                            console.log('Selected rows per page changed to:', selectedRowsPerPage.value);
                            handleChangeRowsPerPage(selectedRowsPerPage.value);
                            previousRowsPerPage.value = newValue;
                        }
                    }
                }
            });

            observer.observe(dropdownLabel, { subtree: true, characterData: true, childList: true });
        });

        const handleChangeRowsPerPage = async (selectedRowsPerPageValue) => {
            const paginationParam = selectedRowsPerPageValue;

            const currentPageElement = document.querySelector('.p-highlight');
            let newPageNumCalc = 1;

            if (currentPageElement) {
                newPageNumCalc = parseInt(currentPageElement.textContent);
            }

            const BASE_API_URL = useRuntimeConfig().public.apiBase;

            const apiURL = BASE_API_URL + 
                        APIpath.value +
                        (APIqueryString.value ? '/' : '') + 
                        APIqueryString.value +
                        (APIqueryString.value ? '&' : '?') + 
                        'page=' + 
                        newPageNumCalc;

            const response = await fetch(apiURL, {
                method: 'GET',
                headers: {
                    'PAGINATIONPARAM': paginationParam
                }
            });

            const data = await response.json();
            productsList.value = data.results.product_list;
            productsQuantity.value = data.count;
            currentPage.value = newPageNumCalc;
        };

        const handleClick = async (event) => {
            if (event.target.classList.contains('p-paginator-page')) {
                const clickedElement = event.target;

                try {
                    const BASE_API_URL = useRuntimeConfig().public.apiBase;
                    const apiURL = BASE_API_URL + 
                        APIpath.value +
                        (APIqueryString.value ? '/' : '') + 
                        APIqueryString.value +
                        (APIqueryString.value ? '&' : '?') + 
                        'page=' + 
                        clickedElement.textContent;

                    const response = await fetch(apiURL, {
                        method: 'GET',
                    });

                    const data = await response.json();
                    productsList.value = data.results.product_list;
                    productsQuantity.value = data.count;
                    currentPage.value = clickedElement.textContent;
                    
                } catch (error) {
                    console.error('Ошибка отправки запроса:', error);
                }
            }
        };

        return {
            totalRecords,
            selectedRowsPerPage,
            handleClick,
            handleChangeRowsPerPage,
            currentPage,
            productsQuantity,
            productsList,
        };
    },
};
</script>

<style>
.p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
    background: #9ff02f;
    border-color: #E3F2FD;
    color: #495057;
}
</style>