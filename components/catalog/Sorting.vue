<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\Sorting.vue -->

<template>
    <div class="sorting-container mt-5">
        <div class="sorting-wrapper">
            <div class="view-mode-buttons">
                <a>
                    <i class="fa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M149.333 56v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V56c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zm181.334 240v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm32-240v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24zm-32 80V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.256 0 24.001-10.745 24.001-24zm-205.334 56H24c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zm386.667-56H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm0 160H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H386.667c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zM181.333 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24z"/></svg></i>
                </a>
                <a>
                    <i class="fa"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M40 48C26.7 48 16 58.7 16 72v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V72c0-13.3-10.7-24-24-24H40zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM16 232v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V232c0-13.3-10.7-24-24-24H40c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24H88c13.3 0 24-10.7 24-24V392c0-13.3-10.7-24-24-24H40z"/></svg></i>
                </a>
            </div>
            <div class="products_quantity">
                Всего товаров: {{ products_quantity }}
            </div>
            <div class="sorting">
                <select class="sorting-options mr-5">
                    <option value="name_asc">По названию (А-Я)</option>
                    <option value="name_desc">По названию (Я-А)</option>
                    <option value="price_asc">По цене (возрастание)</option>
                    <option value="price_desc">По цене (убывание)</option>
                </select>
                <button class="sorting-button" @click="sortProducts">Сортировать</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    inject: ['products_quantity'],
};
</script>
  
<style scoped>
.sorting-container {
  border: 1px solid black;
}
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

.sorting-button {
    border: 1px solid black;
}
.sorting-options {
    border: 1px solid black;
}
</style>