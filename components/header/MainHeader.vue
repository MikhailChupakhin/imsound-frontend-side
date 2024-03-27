<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\MainHeader.vue -->

<template>
  <header class="header">
    <div class="wrapper">
      <div class="header-container">
        <HeaderTopRow :class="{ 'hidden': scrolledDown }"/>
        <div class="header-components">
          <SiteLogo />
          <HeaderMenu />
          <div class="flex flex-wrap gap-3">
            <HeaderSearchPanel />
            <HeaderCart />
            <HeaderUser />
            <HeaderHamburgerMenu />
          </div>
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

import HeaderCart from './HeaderCart.vue';
import HeaderUser from './HeaderUser.vue';
import HeaderHamburgerMenu from './HeaderHamburgerMenu.vue';

export default {
  components: {
    HeaderTopRow,
    SiteLogo,
    HeaderMenu,
    HeaderSearchPanel,
    HeaderCart,
    HeaderUser,
    HeaderHamburgerMenu
  },
  data() {
    return {
      scrolledDown: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolledDown = window.scrollY > 0;
    }
  }
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
  margin-left: 0.9rem;
  margin-right: 0.9rem;
}
  
.header-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  width: 100%;
  z-index: 1000;
}

.header-components {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}


.header {
  position: fixed;
  z-index: 99;
}
.hidden {
  display: none !important;
}
</style>