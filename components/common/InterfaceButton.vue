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
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}
.interface-btn-1:hover {
  background-color: rgb(192, 115, 8);
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4);
}
@media screen and (max-width: 440px) {
    .interface-btn-1 {
      padding: 3px 3px;
      font-size: 1rem;
      font-weight: 300;
    }
}

</style>