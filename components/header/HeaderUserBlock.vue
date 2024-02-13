<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderUserBlock.vue -->

<template>
  <div class="container flex justify-between items-center px-4 py-2">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-10 ml-auto rounded flex items-center">
      <img src="/static/svg/cart-trolley.svg" class="w-6 h-6 mr-2" alt="Корзина">
      <span>Корзина</span>
    </button>
    <div class="flex items-center menu-container">
      <button v-if="isAuthenticated" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="showMenu = !showMenu">Меню</button>
      <button v-else @click="openLoginModal"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Войти</button>
      <div v-show="showMenu" class="menu bg-white shadow-md z-10">
        <ul>
          <NuxtLink :to="`/users/profile/`" class="auth-menu-item">Профиль</NuxtLink>
          <NuxtLink :to="`/`" class="auth-menu-item">Заказы</NuxtLink>
          <a @click="logout" class="auth-menu-danger border-t border-gray-200">Выйти</a>
        </ul>
      </div>
    </div>
    <div v-if="showLoginModal" class="login-modal">
      <div class="modal-content">
        <!-- Форма авторизации -->
        <p>Личный кабинет</p>
        <form @submit.prevent="submitForm">
          <div>
            <label for="username">Имя пользователя:</label>
            <input type="text" id="username" v-model="formData.username" autocomplete="username" required>
          </div>
          <div>
            <label for="password">Пароль:</label>
            <input type="password" id="password" v-model="formData.password" autocomplete="current-password" required>
          </div>
          <button type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4 mx-auto w-1/2 block">Войти</button>
            <button @click="closeLoginModal" class="modal-close">Закрыть</button>
          <p v-if="errorMessage" class="text-red-500 mt-2 mx-auto w-1/2">Неверные учетные данные</p>
        </form>
        
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isAuthenticated: false,
      showMenu: false,
      showLoginModal: false,
      formData: {
        username: '',
        password: '',
      },
      errorMessage: null,
    };
  },
  mounted() {
    this.isAuthenticated = localStorage.getItem('accessToken') !== null;
    this.checkQueryParams();
  },
  methods: {
    openLoginModal() {
      this.showLoginModal = true;
      this.$emit('open-modal');
    },
    closeLoginModal() {
      this.showLoginModal = false;
    },
    async submitForm() {
      try {
        const config = useRuntimeConfig()
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'token/'
        const responseData = await $fetch(`${BASE_API_URL}${endpoint}`, {
          method: 'post',
          body: JSON.stringify({
            username: this.formData.username,
            password: this.formData.password,
          })
        });

        localStorage.setItem('accessToken', responseData.access);
        localStorage.setItem('refreshToken', responseData.refresh);
        this.isAuthenticated = true;
        this.closeLoginModal();
        await this.$router.push('/');

      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        if (error.message === 'Failed to fetch') {
          this.errorMessage = 'Ошибка при отправке запроса. Пожалуйста, проверьте ваше интернет-соединение';
        } else {
          this.errorMessage = 'Неверные учетные данные';
        }
      }
    },
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.isAuthenticated = false;
      this.$router.push('/');
    },
    checkQueryParams() {
      // Проверяем параметры запроса и открываем модальное окно, если необходимо
      const queryParams = this.$route.query;
      if (queryParams.showLoginModal === 'true') {
        this.showLoginModal = true;
      }
    }
  }
};

</script>

<style scoped>
.menu-container {
  position: relative;
}

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 120px;
}

.auth-menu-item {
  padding: 8px 16px;
  display: block;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.auth-menu-item:hover {
  background-color: #f0f0f0;
}

.auth-menu-danger {
  padding: 8px 16px;
  display: block;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.auth-menu-danger:hover {
  background-color: #ffcccc;
  color: red;
}

.login-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  width: 400px;
}

.modal-close {
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.form-group {
    margin-bottom: 15px;
}
label {
    display: block;
    margin-bottom: 5px;
}
input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 3px;
}
button[type="submit"] {
    padding: 10px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 7px;
    cursor: pointer;
}
</style>