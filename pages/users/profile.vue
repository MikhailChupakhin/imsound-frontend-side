<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\profile.vue -->

<template>
  <Head :metaTitle="pageTitle" :metaDescription="metaDescription" />
  <MainHeader />
  <BreadcrumbsNav />
  <div class="main_container">
      <div v-if="response">
        <div class="grid">
          <!-- <div class="col">
            <img :src="response && response.image" alt="User Image" />
            <input type="file" @change="handleFileChange" accept="image/*" />
          </div> -->
          <div class="col">
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="first_name">Имя:</label>
                <input type="text" id="first_name" v-model="formData.first_name" />
              </div>
              <div class="form-group">
                <label for="last_name">Фамилия:</label>
                <input type="text" id="last_name" v-model="formData.last_name" />
              </div>
              <div class="form-group">
                <label for="username">Ник:</label>
                <input type="username" id="username" v-model="formData.username" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email" />
              </div>
              <!-- Другие поля формы -->
              <button type="submit">Сохранить изменения</button>
            </form>
          </div>
        </div>
      </div>
      <div v-else>
        Загрузка...
      </div>
  </div>
  <FooterBottom />
</template>

<script setup>
import Head from '~/components/common/Head.vue';
import MainHeader from '~/components/header/MainHeader.vue';
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import authRequestHandler from '@/utils/authRequestHandler';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import { useBaseStore } from '~/store/baseData';

const baseStore = useBaseStore();
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);
provide('breadcrumbs', [["/", "Главная"], ["/users/my-profile/", "Мой профиль"]]);

const config = useRuntimeConfig();
const BASE_BRANDNAME = config.public.brandName;

const pageTitle = ref(`Личный кабинет | ${BASE_BRANDNAME}`);
const metaDescription = ref(`Личный кабинет| ${BASE_BRANDNAME}`);

const formData = ref({
  first_name: '',
  last_name: '',
  username: '',
  email: '',
});

const response = ref(null);
const BASE_API_URL = config.public.apiBase;
const endpoint = 'users/profile/';

if (process.client) {
    (async () => {
        const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'GET');
        response.value = await apiResponse.json();
        formData.value.first_name = response.value.first_name;
        formData.value.last_name = response.value.last_name;
        formData.value.username = response.value.username;
        formData.value.email = response.value.email;
    })();
}

const submitForm = async () => {
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
      first_name: formData.value.first_name,
      last_name: formData.value.last_name,
      username: formData.value.username,
      email: formData.value.email,
    });

    const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
    response.value = await apiResponse.json();
  } catch (error) {
    console.log('error during post form')
  }
}

</script>

<style scoped>
.main_container {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 1rem;
}
</style>