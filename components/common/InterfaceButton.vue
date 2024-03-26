<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\common\InterfaceButton.vue -->

<template>
    <button class="interface-btn-1">{{ buttonText }}</button>
</template>
  
<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    }
  }
}
</script>
  
<style scoped>
.interface-btn-1 {
    padding: 5px 10px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    background-color: rgba(73, 192, 232, 0.84);
    color: #000000;
    border: 1px solid gray;
    cursor: pointer;
    transition: background-color 0.3s;
}

.interface-btn-1:hover {
    background-color: rgb(58, 77, 146);
}

@media screen and (max-width: 440px) {
    .interface-btn-1 {
      padding: 3px 3px;
      font-size: 0.8rem;
      font-weight: 300;
    }
}

</style>