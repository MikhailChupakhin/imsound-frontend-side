<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productdetails\ProductCallMe.vue -->

<template>
    <div class="call-me-container grid">
        <div class="col image-wrapper">
            <div class="hotline-image">
                <img src="/assets/img/hotline.webp" alt="Hotline Image" class="w-full max-w-full">
            </div>
        </div>
        <div class="col text-center">
            <div class="text-section">
                <div><strong>Хочешь доебаться, ниггер?</strong></div>
                <p>Позвони мне, и попиздим, сука.</p>
            </div>
        </div>
        <div class="col text-center">
            <div><strong>+1 234 567 890</strong></div>
            <button>Перезвоните мне</button>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.hotline-image {
    max-width: 350px;
    height: auto;
}
.call-me-container {
    border-radius: 5px;
    border: 0.1px solid black;
}
@media screen and (max-width: 700px) {
    .image-wrapper {
        display: none;
    }
}
</style>