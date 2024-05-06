<template>
    <div class="flex">
        <div class="col-6 text-center">
            <h4>О нас</h4>
            <ul>
                <li v-for="page in company_info" :key="page.slug">
                    <nuxt-link :to="`info/${page.slug}`">{{ page.title }}</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="col-6 text-center">
            <h4>Клиентам</h4>
            <ul class="text-center">
                <li v-for="page in clients_info" :key="page.slug">
                    <nuxt-link :to="`info/${page.slug}`">{{ page.title }}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
export default {
    inject: ['company_info', 'clients_info'],
};
</script>
  
<style scoped>
ul {
  list-style-type: none;
  padding-inline-start: 0;
}
a {
  text-decoration: none;
}
</style>