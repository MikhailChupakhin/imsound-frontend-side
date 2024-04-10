<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\index\Discounts.vue -->

<template>
    <div class="discounts-container">
        <div class="background-image">
            <div class="inner">
                <div class="avds_discount_container">
                    <img src="/assets/img/discount.png" alt="">
                    <div>
                        <div class="avds_discount">
                            <div>-20<span>%</span></div>
                            <div>Discount</div>
                        </div>
                    </div>
                </div>
                <div class="avds_small_content">
                    <div class="avds_title">Скидки!</div>
                    <div class="avds_link"><NuxtLink :to="`/catalog/?is_discounted=true`" >Смотреть</NuxtLink></div>
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
    background-image: url('/assets/img/discounted_products_backgroud.webp');
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
    top: 4rem;
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