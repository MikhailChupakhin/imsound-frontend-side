<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\blog\BlogPagination.vue -->

<template>
  <nav>
    <Paginator
      :rows="9"
      :totalRecords="articlesCount"
      template="PrevPageLink CurrentPageReport NextPageLink"
      :currentPageReportTemplate="`Показаны ${articlesQty} из {totalRecords}`"
      @click="handleClick"
    />
  </nav>

</template>

<script setup>
import Paginator from 'primevue/paginator';
const emits = defineEmits(['prevPage', 'nextPage', 'updateArticleList']);
const articlesQty = inject('articlesQty');
const props = defineProps({
  articlesCount: {
    type: Number,
    required: true
  },
});

const route = useRoute();
const APIpath = 'blog/';
const currentPage = ref(1);

const handleClick = async (event) => {
  const target = event.target.closest('.p-paginator-prev, .p-paginator-next');
  let newPage;
  if (target) {
    if (target.classList.contains('p-paginator-next')) {
      newPage = currentPage.value + 1;
    } else if (target.classList.contains('p-paginator-prev')) {
      newPage = currentPage.value > 1 ? currentPage.value - 1 : 1;
    }
    
    console.log(newPage);

    try {
      const BASE_API_URL = useRuntimeConfig().public.apiBase;
      const apiURL = BASE_API_URL +
        APIpath +
        '?page=' +
        newPage;
      console.log(apiURL);
      const response = await fetch(apiURL, {
        method: 'GET',
      });

      const data = await response.json();
      emits('updateArticleList', data.pagination.results);
      currentPage.value = newPage;

    } catch (error) {
      console.error('Ошибка отправки запроса:', error);
    }
  } else {
    console.log(event.target);
  }
};
</script>

<style scoped>
.p-paginator-element {
  z-index: 3;
}
.p-icon {
  z-index: 2;
}
</style>