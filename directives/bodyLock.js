export default {
    mounted(el, binding) {
      if (binding.value) {
        document.body.classList.add('body-locked');
      }
    },
    updated(el, binding) {
      if (binding.value) {
        document.body.classList.add('body-locked');
      } else {
        document.body.classList.remove('body-locked');
      }
    },
  };