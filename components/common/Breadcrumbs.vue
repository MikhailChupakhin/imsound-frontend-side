<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\common\Breadcrumbs.vue -->

<template>
    <div class="home">
        <div class="home_container background-image">
            <div class="home_content">
                <div class="results">
                    <ul class="breadcrumbs">
                        <li v-for="(breadcrumb, index) in breadcrumbs" :key="index">
                            <template v-if="index !== breadcrumbs.length - 1">
                                <a :href="breadcrumb[0]">{{ breadcrumb[1] }}</a>
                            </template>
                        </li>
                    </ul>
                </div>
                <h1 class="h1 text-5xl">{{ breadcrumbs[breadcrumbs.length - 1][1] }}</h1>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    inject: ['breadcrumbs'],
};
</script>

<style scoped>
.home_container{
    height: 150px;
}
.background-image {
    background-image: url('~/assets/categories.jpg');
}

.h1 {
    color: #ffffff;
}
</style>