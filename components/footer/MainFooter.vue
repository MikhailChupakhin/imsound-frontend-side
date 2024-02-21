<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\footer\MainFooter.vue -->

<template>
    <footer class="main-footer">
        <FooterInfoPages />
        <div class="flex">
            <div class="col-3 text-center">
                <SiteLogo/>
            </div>
            <div class="col-9 text-center">
                Copyright ©2024 Developed by Mikhail Chupakhin, 2024
            </div>
        </div>
    </footer>
</template>
  
<script>
import SiteLogo from '../common/SiteLogo.vue';
import FooterInfoPages from './FooterInfoPages.vue'

export default {
    components: {
        SiteLogo
    }
};
</script>
  
<style scoped>
.main-footer {
    margin-top: 20px;
    background-color: #dcdcdc;
}
.flex {
    align-items: center;
}
</style>