<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\registration.vue     -->

<template>
    <div class="form-wrapper">
        <div class="col-10">
            <form @submit.prevent="registerUser">
                <div class="grid">
                    <div class="col-12">
                        <div class="form-header text-center">Создать учетную запись
                        </div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-6 form-group">
                        <label class="form-label" for="first_name">Имя:</label>
                        <input v-model="formData.first_name" type="text" id="first_name" class="form-control" :class="{ 'error-field': errors.first_name }" placeholder="Введите имя">
                        <div class="form-error">{{ errors.first_name }}</div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-6 form-group">
                        <label class="form-label" for="last_name">Фамилия:</label>
                        <input v-model="formData.last_name" type="text" id="last_name" class="form-control" :class="{ 'error-field': errors.last_name }" placeholder="Введите фамилию">
                        <div class="form-error">{{ errors.last_name }}</div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-6 form-group">
                        <label class="form-label" for="username">Имя пользователя:</label>
                        <input v-model="formData.username" type="text" id="username" class="form-control" :class="{ 'error-field': errors.username }" placeholder="Введите имя пользователя">
                        <div class="form-error">{{ errors.username }}</div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-6 form-group">
                        <label class="form-label" for="email">Email:</label>
                        <input v-model="formData.email" type="email" id="email" class="form-control" :class="{ 'error-field': errors.email }"  placeholder="Введите адрес электронной почты">
                        <div class="form-error">{{ errors.email }}</div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-6 form-group">
                        <label class="form-label" for="password1">Пароль:</label>
                        <input v-model="formData.password1" type="password" id="password1" class="form-control" :class="{ 'error-field': errors.password1 }"  placeholder="Введите пароль">
                        <div class="form-error">{{ errors.password1 }}</div>
                    </div>
                    <div class="col-12 md:col-6 lg:col-6 form-group">
                        <label class="form-label" for="password2">Подтверждение пароля:</label>
                        <input v-model="formData.password2" type="password" id="password2" class="form-control" :class="{ 'error-field': errors.password2 }" placeholder="Подтвердите пароль">
                        <div class="form-error">{{ errors.password2 }}</div>
                    </div>
                    <div class="col-12">
                        <CommonInterfaceButton buttonText="Создать аккаунт" type="submit" :customStyle="{ width: '100%' }"/>
                    </div>
                </div>
            </form>
            <div class="col-12">
                <button class="link-button" @click="redirectToCatalog">Уже есть аккаунт? Авторизоваться</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const router = useRouter();
const config = useRuntimeConfig();
const BASE_API_URL = config.public.apiBase;

const formData = ref({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password1: '',
    password2: ''
});

const errors = ref({});

async function registerUser() {
    errors.value = {};
    if (!validateFormData(formData)) {
        return;
    }
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify({
        ...formData.value,
    });

    try {
        const endpoint = 'users/registration/';
        const response = await fetch(BASE_API_URL + endpoint, {
            method: 'POST',
            headers: headers,
            body: body
        });
        if (response.status === 201) {
            router.push({ path: '/', query: { showLoginModal: true } });
        } else {
            console.log(response.errors)
            const responseData = await response.json();
            if (responseData.errors) {
                for (const [fieldName, fieldErrors] of Object.entries(responseData.errors)) {
                    errors.value[fieldName] = fieldErrors.join(', ');
                }
            }
        }
    } catch (error) {
        console.error('Произошла ошибка при выполнении запроса:', error);
    }
    };

    const validateFormData = (formData) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        Object.keys(formData.value).forEach(key => {
            if (!formData.value[key]) {
                errors.value[key] = `Поле обязательно для заполнения!`;
            } else {
                if (key === 'email') {
                    if (!emailRegex.test(formData.value[key])) {
                        errors.value[key] = `Неправильный формат email в поле!`;
                    }
                }
                if (key === 'password1') {
                    if (formData.value[key].length < 8) {
                        errors.value[key] = `Пароль должен содержать минимум 8 символов!`;
                    } else if (!/[a-z]/.test(formData.value[key]) || !/[A-Z]/.test(formData.value[key]) || !/\d/.test(formData.value[key])) { // Исправляем formData[key] на formData.value[key]
                        errors.value[key] = `Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву и одну цифру!`;
                    }
                }
                if (key === 'password2') {
                    if (formData.value[key] !== formData.value['password1']) {
                        errors.value[key] = `Пароли не совпадают!`;
                    }
                }
            }
        });
        if (Object.keys(errors.value).length > 0) {
            console.error('Ошибки валидации:', errors.value);
            return false;
        }

        return true;
    };

    function redirectToCatalog() {
        router.push({ path: '/catalog', query: { showLoginModal: true } });
    }
</script>

<style scoped>
.form-wrapper {
    padding-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;

}
.form-header {
    font-size: 2rem;
    font-weight: 500;
}
.form-label {
    font-size: 1rem;
    font-weight: 500;
}
.form-control {
    width: 100%;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
}
.form-control:focus {
    outline: none;
}
.link-button {
    width: 100%;
    background: none;
    border: none;
    color: blue;
    font-size: 1.1rem;
    font-family: inherit;
    padding: 0;
    transition: background-color 0.3s;
}
.link-button:hover {
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}
.error-field {
  border-color: red !important;
}
.form-error {
  color: red;
  font-size: 0.8em;
  margin-top: 0.5em;
  margin-left: 0.8rem;
}
</style>