<template>
    <NuxtLink id="cart-button" :to="isAuthenticated ? '/users/cart/' : '/users/cart-guest/'">
        <img src="/static/svg/cart-trolley.svg" class="svg-icon-2" alt="Корзина">
        <span class="cart-text"></span>
    </NuxtLink>
</template>

<script setup>
import { useAuthStore } from '~/store/useAuthStore';

const authData = useAuthStore();
const isAuthenticated = ref(false);
const router = useRouter();

onMounted(() => {
    checkAuthentication();
});

async function checkAuthentication() {
    const cookies = document.cookie;
    const accessTokenCookieExists = cookies.includes('accessToken');
    isAuthenticated.value = accessTokenCookieExists;
}
</script>

<style scoped></style>