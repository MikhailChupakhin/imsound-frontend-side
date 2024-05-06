<template>
    <div class="discounts-container">
        <div class="background-image">
            <div class="inner">
                <div class="avds_discount_container">
                    <img src="/assets/img/new.png" width="150px" height="150px" alt="">
                </div>
                <div class="avds_small_content">
                    <div class="avds_title">Новинки!</div>
                    <div class="avds_link"><NuxtLink :to="`/catalog/?is_new=true`" >Смотреть</NuxtLink></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.background-image {
    width: 100%;
    height: 300px;
    background-image: url('/assets/img/new_products_background.webp');
    background-size: cover;
    background-position: center;
    padding: 1rem;
}
.inner {
    position: relative;
    border: 1px solid white;
    height: 100%;
    padding: 1rem;
}

.avds_discount_container {
    position: absolute;
    right: 1rem;
    top: 8rem;
}
.avds_title {
    font-size: 4rem;
    font-weight: 500;
    color: white;
}
.avds_discount {
    position: absolute;
    bottom: 6.5rem;
    right: 0;
    width: 152px;
    text-align: center;
}
.avds_discount div:first-child {
    font-size: 4rem;
    font-weight: 700;
    color: #1b1b1b;
    line-height: .75;
}
.avds_link a {
    margin-left: 1rem;
    text-decoration: underline;
    position: relative;
    display: inline-block;
    font-size: 1.3rem;
    font-weight: 400;
    color: #fff;
}
</style>
