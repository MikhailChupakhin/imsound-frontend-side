<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\common\BreadcrumbsNav.vue -->

<template>
    <div class="home">
        <div class="home_container background-image">
            <div class="home_content">
                <Breadcrumb :model="formattedBreadcrumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" :to="item.route" custom>
                            <a :href="item.route" v-bind="props.action">
                                <span :class="[item.icon, 'text-color']" />
                                <span class="text-primary font-semibold">{{ item.label }}</span>
                            </a>
                        </router-link>
                        <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                            <span class="text-color">{{ item.label }}</span>
                        </a>
                    </template>
                </Breadcrumb>
                <h1 class="h1">{{ breadcrumbs[breadcrumbs.length - 1][1] }}</h1>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    inject: ['breadcrumbs'],
    computed: {
        formattedBreadcrumbs() {
            const slicedBreadcrumbs = this.breadcrumbs.slice(0, -1);
            return slicedBreadcrumbs.map(crumb => ({
                label: crumb[1],
                route: crumb[0]
            }));
        }
    }
};
</script>

<style scoped>
.home {
    height: auto;
}


.home_container {
    height: auto;
    margin-top: 95px;
}

.background-image {
    background-image: url('~/assets/categories.jpg');
}

.h1 {
    margin-left: 1rem;
    margin-block-start: 0;
    color: #ffffff;
    font-size: 2.5rem;
    padding-bottom: 1rem;
}

.p-breadcrumb {
    background-color: transparent;
    border: none;
}
</style>

<style>
.p-breadcrumb .p-breadcrumb-list li.p-menuitem-separator {
    margin: 0 0.5rem 0 0.5rem;
    color: #ffffff;
}
</style>