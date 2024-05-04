<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderUser.vue -->

<template>
  <div class="flex items-center menu-container">
    <div class="svg-icon-2" v-if="isAuthenticated" @click="showMenu = !showMenu">
      <svg fill="#008000" id="svg3171" version="1.1" viewBox="0 0 6.3499999 6.3500002" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs3165"/><g id="layer1"><path d="m 3.176292,0.52916623 c -0.7275637,0 -1.3245961,0.59496497 -1.3245961,1.32252887 0,0.7275639 0.5970324,1.3245964 1.3245961,1.3245962 0.727564,0 1.3220123,-0.5970323 1.3220123,-1.3245962 0,-0.7275639 -0.5944483,-1.32252887 -1.3220123,-1.32252887 z M 2.1173387,3.4398668 c -0.7943443,0 -1.58817203,0.5292183 -1.58817203,1.3220123 V 5.350014 c 0.05042,0.3308308 0.2646094,0.4713351 0.52973543,0.4708184 H 5.2916149 C 5.5567406,5.8213615 5.731772,5.6000289 5.8208331,5.350014 V 4.7618791 C 5.8213623,3.7044758 5.0275223,3.4398668 4.2326614,3.4398668 Z" id="path1826" /></g></svg>
    </div>
    <div class="svg-icon-2" v-else @click="openLoginModal">
      <svg id="svg3171" version="1.1" viewBox="0 0 6.3499999 6.3500002" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs3165"/><g id="layer1"><path d="m 3.176292,0.52916623 c -0.7275637,0 -1.3245961,0.59496497 -1.3245961,1.32252887 0,0.7275639 0.5970324,1.3245964 1.3245961,1.3245962 0.727564,0 1.3220123,-0.5970323 1.3220123,-1.3245962 0,-0.7275639 -0.5944483,-1.32252887 -1.3220123,-1.32252887 z M 2.1173387,3.4398668 c -0.7943443,0 -1.58817203,0.5292183 -1.58817203,1.3220123 V 5.350014 c 0.05042,0.3308308 0.2646094,0.4713351 0.52973543,0.4708184 H 5.2916149 C 5.5567406,5.8213615 5.731772,5.6000289 5.8208331,5.350014 V 4.7618791 C 5.8213623,3.7044758 5.0275223,3.4398668 4.2326614,3.4398668 Z" id="path1826" /></g></svg>
    </div>
    <div v-show="showMenu" class="menu-container-expanded">
      <div class="menu bg-white shadow-md z-10">
        <NuxtLink :to="'/users/profile/'" class="auth-menu-item">Ваш профиль</NuxtLink>
        <NuxtLink :to="'/users/my-orders/'" class="auth-menu-item">Ваши заказы</NuxtLink>
        <div @click="logout" class="auth-menu-danger border-t border-gray-200" role="button" tabindex="0" aria-label="Выйти из профиля">Выйти из профиля</div>
        <div class="menu-divider"></div>
        <div @click="showMenu = !showMenu" class="auth-menu-close" role="button" tabindex="0" aria-label="Закрыть меню">закрыть меню</div>
      </div>
    </div>
  </div>
  <div v-if="authData.isLoginModalOpen" class="login-modal">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <CommonSiteLogo />
        <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
        <span class="text-600 font-medium line-height-3">Еще нет аккаунта?</span>
        <NuxtLink to="/users/registration" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
          Зарегистрируйтесь!</NuxtLink>
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
</template>

<script setup>
import { useAuthStore } from '~/store/useAuthStore';
const authData = useAuthStore();
const isAuthenticated = ref(false);
const showMenu = ref(false);
const showLoginModal = ref(authData.isLoginModalOpen);

window.addEventListener('open-login-modal', () => {
  showLoginModal.value = true;
});

watch(() => showLoginModal.value, (newValue) => {
  authData.setModalState(newValue);
});

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

const emit = defineEmits(['open-modal']);

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
      headers: { 'Content-Type': 'application/json' },
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
.menu-container-expanded {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

.menu {
  width: 20rem;
  background-color: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.menu-divider {
  padding: 0.5rem 1rem;
  display: block;
  color: #333;
  height: 0.05rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.auth-menu-item {
  padding: 0.5rem 1rem;
  display: block;
  color: #333;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.auth-menu-close {
  display: block;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  text-align: center;
  cursor: pointer;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.auth-menu-close:hover {
  background-color: #f0f0f0;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
.auth-menu-item:hover {
  background-color: #f0f0f0;
}
.auth-menu-danger {
  padding: 0.5rem 1rem;
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
  padding: 1.2rem;
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