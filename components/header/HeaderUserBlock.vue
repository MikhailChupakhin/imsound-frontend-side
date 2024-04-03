<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderUserBlock.vue -->

<template>
  <div class="container flex py-2">
    <NuxtLink id="cart-button":to="isAuthenticated ? '/users/cart/' : '/users/cart-guest/'" class="cart-button bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 mr-2 flex items-center">
      <img src="/static/svg/cart-trolley.svg" class="svg-icon-2 mr-2" alt="Корзина">
      <span class="cart-text">Корзина</span>
    </NuxtLink>
    <div class="flex items-center menu-container">
      <button v-if="isAuthenticated" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2"
        @click="showMenu = !showMenu">Меню</button>
      <button v-else @click="openLoginModal"
        class="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-4 py-2">Войти</button>
      <div v-show="showMenu" class="menu bg-white shadow-md z-10">
        <NuxtLink :to="'/users/profile/'" class="auth-menu-item">Профиль</NuxtLink>
        <NuxtLink to="'/users/my-orders/'" class="auth-menu-item">Мои заказы</NuxtLink>
        <a @click="logout" class="auth-menu-danger border-t border-gray-200">Выйти</a>
      </div>
    </div>
    <div v-if="showLoginModal" class="login-modal">

      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <CommonSiteLogo/>
          <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
          <span class="text-600 font-medium line-height-3">Еще нет аккаунта?</span>
          <NuxtLink to="/users/registration" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Зарегистрируйтесь!</NuxtLink>
        </div>

        <div>
          <form @submit.prevent="submitForm">
            <label for="username" class="block text-900 font-medium mb-2">Имя пользователя</label>
            <InputText id="username" type="text" v-model="formData.username" class="w-full mb-3" required />

            <label for="password" class="block text-900 font-medium mb-2">Пароль</label>
            <InputText id="password" type="password" v-model="formData.password" class="w-full mb-3" required />
            <p v-if="errorMessage" class="text-red-500 mt-2 mx-auto w-1/2">Неверные учетные данные</p>

            <div class="flex align-items-center justify-content-between mb-6">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" :binary="true" v-model="rememberMe" class="mr-2"></Checkbox>
                <label for="rememberme1">Сохранить данные</label>
              </div>
              <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Забыли пароль?</a>
            </div>
            <Button label="Войти" type="submit" icon="pi pi-user" class="w-full"></Button>
          </form>
          <Button label="Закрыть" @click="closeLoginModal" class="w-full mt-3"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from '~/store/useAuthStore';

const authData = useAuthStore();

const isAuthenticated = ref(false);
const showMenu = ref(false);
const showLoginModal = ref(false);
const formData = reactive({
  username: '',
  password: '',
});
const errorMessage = ref(null);
const rememberMe = ref(false);

const router = useRouter();


onMounted(() => {
  if (localStorage.getItem('rememberedUsername')) {
    formData.username = localStorage.getItem('rememberedUsername');
  }
  if (localStorage.getItem('rememberedPassword')) {
    formData.password = localStorage.getItem('rememberedPassword');
  }
  checkAuthentication();
  checkQueryParams();
});

async function checkAuthentication() {
  const cookies = document.cookie;
  const accessTokenCookieExists = cookies.includes('accessToken');

  isAuthenticated.value = accessTokenCookieExists;
}

function openLoginModal() {
  showLoginModal.value = true;
  emit('open-modal');
}

function closeLoginModal() {
  showLoginModal.value = false;
}

async function submitForm() {
  try {
    const config = useRuntimeConfig()
    const BASE_API_URL = config.public.apiBase;
    const endpoint = 'token/'
    const response = await fetch(`${BASE_API_URL}${endpoint}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      })
    });
    if (rememberMe.value) {
      localStorage.setItem('rememberedUsername', formData.username);
      localStorage.setItem('rememberedPassword', formData.password);
    } else {
      localStorage.removeItem('rememberedUsername');
      localStorage.removeItem('rememberedPassword');
    }
    const responseData = await response.json();
    if (responseData.detail == 'No active account found with the given credentials') {
      errorMessage.value = 'Неверные учетные данные!';
    } else {
      // На localhost браузер не принимает куки с флагами HttpOnly; Secure (из за отсутствия https?)

      // document.cookie = `accessToken=${responseData.access}; path=/; HttpOnly; Secure`;
      // document.cookie = `refreshToken=${responseData.refresh}; path=/; HttpOnly; Secure`;

      document.cookie = `accessToken=${responseData.access}; path=/;`;
      document.cookie = `refreshToken=${responseData.refresh}; path=/;`;

      isAuthenticated.value = true;
      authData.setAuthenticated(true);

      closeLoginModal();
      await router.push('/');
    }
 

    

  } catch (error) {
    console.error('Ошибка при отправке запроса:', error);
    if (error.message === 'Failed to fetch') {
      errorMessage.value = 'Ошибка при отправке запроса.';
    } else {
      errorMessage.value = 'Неверные учетные данные!';
    }
  }
}

function logout() {
  document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  showMenu.value = false;
  isAuthenticated.value = false;
  authData.setAuthenticated(false);
  router.push('/');
}

function checkQueryParams() {
  const queryParams = router.currentRoute.value.query;
  if (queryParams.showLoginModal === 'true') {
    showLoginModal.value = true;
  }
}
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
  z-index: 1000;
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
  z-index: 1000;
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

button {
  border: none;
  border-radius: 10px;
}
.cart-button {
  text-decoration: none;
  border-radius: 10px;
}

button[type="submit"] {
  padding: 10px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}
@media screen and (max-width: 450px) {
    .cart-text {
        display: none;
    }
}
</style>