<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\common\InterfaceButton.vue -->

<template>
    <button class="interface-btn-1":style="customStyle">{{ buttonText }}</button>
</template>
  
<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    },
    customStyle: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
  
<style scoped>
.interface-btn-1 {
  padding: 0.3rem 0.6rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 10px;
  background-color: rgba(246, 160, 23);
  border: 1px solid gray;
  color: #000000;
  cursor: pointer;
  transition: background-color 0.3s;
}
.interface-btn-1:hover {
    background-color: rgb(192, 115, 8);
}
@media screen and (max-width: 440px) {
    .interface-btn-1 {
      padding: 3px 3px;
      font-size: 0.8rem;
      font-weight: 300;
    }
}

</style>