<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\MainHeader.vue -->

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header_container">
        <HeaderTopRow />
        <div class="header_components">
          <SiteLogo />
          <HeaderHamburgerMenu />
          <HeaderMenu />
          <HeaderSearchPanel />
          <HeaderUserBlock />
        </div>
      </div>
    </div>
  </header>
</template>
  
<script>
import HeaderTopRow from './HeaderTopRow.vue';
import SiteLogo from '../common/SiteLogo.vue';
import HeaderMenu from './HeaderMenu.vue';
import HeaderSearchPanel from './HeaderSearchPanel.vue';
import HeaderUserBlock from './HeaderUserBlock.vue';
import HeaderHamburgerMenu from './HeaderHamburgerMenu.vue';

export default {
  components: {
    HeaderTopRow,
    SiteLogo,
    HeaderMenu,
    HeaderSearchPanel,
    HeaderUserBlock,
    HeaderHamburgerMenu
  },
}

</script>

<style scoped>
.header {
  width: 100%;
  background-color: #fff;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
  top: 0%;
}
.wrapper {
  margin-left: 15px;
  margin-right: 15px;
}
  
.header_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  width: 100%;
  
  z-index: 1000;
}

.header_components {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}


.header {
  position: fixed;
  z-index: 99;
}

</style>