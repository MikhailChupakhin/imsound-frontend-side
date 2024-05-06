<template>
  <div class="container">
    <NuxtLink :to="`/`" class="logo">IMSOUND</NuxtLink>
  </div>
</template>
  
<script>
export default {
}
</script>

<style scoped>
.logo {
    font-size: 30px;
    font-weight: 700;
    color: #1b1b1b;
    text-decoration: none;
}

@media screen and (max-width: 540px) {
    .logo {
        font-size: 20px;
    }
}
</style>