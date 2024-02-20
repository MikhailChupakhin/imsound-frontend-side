<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\header\MainHeader.vue -->

<template>
  <header class="header">
    <div class="header_container">
      <HeaderTopRow />
      <div class="header_components">
        <HeaderLogo />
        <HeaderMenu />
        <HeaderSearchPanel />
        <HeaderUserBlock />
      </div>
    </div>
  </header>
</template>
  
<script>
import HeaderTopRow from './HeaderTopRow.vue';
import HeaderLogo from './HeaderLogo.vue';
import HeaderMenu from './HeaderMenu.vue';
import HeaderSearchPanel from './HeaderSearchPanel.vue';
import HeaderUserBlock from './HeaderUserBlock.vue';
  
export default {
  components: {
    HeaderTopRow,
    HeaderLogo,
    HeaderMenu,
    HeaderSearchPanel,
    HeaderUserBlock
  }
}

</script>

<style scoped>
.header_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 3px solid rgba(0, 0, 0, 0.1);
}

.header_components {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
</style>