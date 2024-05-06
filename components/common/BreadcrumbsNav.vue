<template>
    <div class="home">
        <div class="home_container">
            <div class="home_content">
                <h1 v-if="showHeading" class="h1">{{ breadcrumbs[breadcrumbs.length - 1][1] }}</h1>
                <Breadcrumb :model="formattedBreadcrumbs">
                    <template #item="{ item, props }">
                        <router-link v-if="item.route" :to="item.route" v-bind="props" class="p-menuitem-link">
                            <span :class="[item.icon, 'text-color']" />
                            <span class="text-primary font-semibold">{{ item.label }}</span>
                        </router-link>
                    </template>
                </Breadcrumb>
            </div>
        </div>
    </div>
</template>
  
<script>

export default {
    inject: ['breadcrumbs'],
    props: {
        showHeading: {
            type: Boolean,
            default: true
        }
    },
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
    margin-top: 5.2rem;
}

.h1 {
    margin-left: 0.9rem;
    margin-right: 0.9rem;
    margin-block-start: 0;
    color: #000000;
    font-size: 2.5rem;
    line-height: 2.5rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
@media screen and (max-width: 767px) {
  .h1 {
    margin-left: 0.3rem;
    font-size: 1.3rem;
    line-height: 1.3rem;
  }
  .p-breadcrumb .p-breadcrumb-list {
    font-size: 0.8rem;
  }
}
.p-breadcrumb {
    background-color: transparent;
    border: none;
}
.r-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}
</style>

<style>
.p-breadcrumb {
    overflow-x: auto;
    white-space: wrap;
}
.p-breadcrumb .p-breadcrumb-list li.p-menuitem-separator {
    margin: 0 0.5rem 0 0.5rem;
    color: #ffffff;
}
.p-breadcrumb {
    padding-top: 0.4rem;
    padding-bottom: 0rem;
}
.p-menuitem-link .text-primary {
    color: #2a2cb3 !important;
    transition: color 0.1s;
}
.p-menuitem-link .text-primary:hover {
    color: rgba(58, 61, 214, 0.8) !important;
}
.p-icon {color: #2a2cb3;}

@media screen and (max-width: 767px) {
  .p-breadcrumb {
    padding: 0.3rem;
  }  
  .p-breadcrumb .p-breadcrumb-list {
    font-size: 0.8rem;
  }
  .p-breadcrumb .p-breadcrumb-list li.p-menuitem-separator {
    margin: 0 0.1rem 0 0.1rem;
  }
}
</style>