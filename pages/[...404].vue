<template>
    <div>
        <div class="error-container">
            <div class="error-content">
                <h1 class="text-7xl">Ой!</h1>
                <p>
                    <strong class="text-5xl">Ошибка 404</strong>
                </p>
                <p class="error-note">Страницы не существует.</p>
                <div class="mt-6">
                    <NuxtLink to="/" class="home-btn">Домой</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
const computedTitle = computed(() => `404! Похоже, этой страницы не существует...`);
const computedDescription = computed(() => `404! Похоже, этой страницы не существует...`);

useSeoData(computedTitle, computedDescription);
</script>

<style scoped>
.error-container {
    background: linear-gradient(to bottom right, #3a284a, #b48abc);
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.error-content {
    text-align: center;
    color: rgb(0, 0, 0);
    position: relative;
    top: -10%;
}

.error-note {
    font-size: 1.6rem;
}

.home-btn {
    background: rgb(177, 9, 9);
    font-size: 1.8rem;
    font-weight: 700;
    border-radius: 10px;
    padding: 1rem;
    text-decoration: none;
    color: black;
}

.home-btn:hover {
    background: rgb(95, 1, 1);
}
</style>