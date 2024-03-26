<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\footer\MainFooter.vue -->

<template>
    <div class="main-footer">
        <FooterInfoPages />
        <FooterBottom />
    </div>
</template>
  
<script>
import SiteLogo from '../common/SiteLogo.vue';
import FooterInfoPages from './FooterInfoPages.vue'
import FooterBottom from './FooterBottom.vue'

export default {
    components: {
        SiteLogo
    }
};
</script>
  
<style scoped>
.main-footer {
    margin-top: 1.6rem;
    background-color: #eee;
}
.flex {
    align-items: center;
}
</style>