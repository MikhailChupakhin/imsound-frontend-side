<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\HeaderUserBlock.vue -->

<template>
  <div class="container flex py-2">
    <button class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 flex items-center">
      <img src="/static/svg/cart-trolley.svg" class="svg-icon-l mr-2" alt="Корзина">
      <span class="mt-1">Корзина</span>
    </button>
    <div class="flex items-center menu-container">
      <button v-if="isAuthenticated" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2"
        @click="showMenu = !showMenu">Меню</button>
      <button v-else @click="openLoginModal"
        class="bg-green-500 hover:bg-green-700 text-white font-bold rounded px-4 py-2">Войти</button>
      <div v-show="showMenu" class="menu bg-white shadow-md z-10">
        <NuxtLink :to="`/users/profile/`" class="auth-menu-item">Профиль</NuxtLink>
        <NuxtLink :to="`/`" class="auth-menu-item">Заказы</NuxtLink>
        <a @click="logout" class="auth-menu-danger border-t border-gray-200">Выйти</a>
      </div>
    </div>
    <div v-if="showLoginModal" class="login-modal">

      <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
          <HeaderLogo />
          <div class="text-900 text-3xl font-medium mb-3">Добро пожаловать!</div>
          <span class="text-600 font-medium line-height-3">Еще нет аккаунта?</span>
          <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Зарегистрируйтесь!</a>
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


<script>
import HeaderLogo from './HeaderLogo.vue';
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
      rememberMe: false,
    };
  },
  mounted() {
    if (localStorage.getItem('rememberedUsername')) {
      this.formData.username = localStorage.getItem('rememberedUsername');
    }
    if (localStorage.getItem('rememberedPassword')) {
      this.formData.password = localStorage.getItem('rememberedPassword');
    }
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
        if (this.rememberMe) {
          localStorage.setItem('rememberedUsername', this.username);
          localStorage.setItem('rememberedPassword', this.password);
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
        }

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
      this.showMenu = false;
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
  border-radius: 4px;
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