<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\profile.vue -->

<template>
    <div class="main_container">
    <MainHeader />
        <div>
          <h1>Профиль пользователя</h1>
          <div v-if="isLoading">Загрузка...</div>
          <div v-else>
            <p>Имя: </p>
            <p>Email: </p>
            <!-- Другие данные профиля -->
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import MainHeader from '~/components/header/MainHeader.vue'
  import authRequestHandler from '@/utils/authRequestHandler';


  export default {
    data() {
      return {
        isLoading: true,
        profile: {}
      };
    },
    async created() {
      try {
        if (process.client) {
        const config = useRuntimeConfig()
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'users/profile/';
        const response = await authRequestHandler(BASE_API_URL, endpoint, 'GET');
          if (response && response.ok) {
            this.profile = await response.json();
          }
        }
      } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
      } finally {
        this.isLoading = false;
      }
    }
  };
  </script>