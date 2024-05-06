<template>
    <button class="anim-button trans-200" type="submit" @click="handleClickInternal">
        <span>{{ buttonText }}</span>
    </button>
</template>

<script setup>
const props = defineProps({
    buttonText: {
        type: String,
        required: true
    },
    handleClick: {
        type: Function,
        required: true
    },
});


const handleClickInternal = () => {
  if (props.handleClick) {
    props.handleClick();
  }
};


</script>

<style scoped>
.anim-button {
    position: relative;
    width: 100%;
    height: 100%;
    border: solid 2px #1b1b1b;
    background: #fff;
    cursor: pointer;
    overflow: hidden;
}

.trans_200 {
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -ms-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
}

.anim-button span {
    display: block;
    position: relative;
    z-index: 10;
    font-size: 16px;
    font-weight: 600;
    color: #1b1b1b;
    background: 0 0;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -ms-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
}

.anim-button:hover span {
    color: #fff;
}

.anim-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1b1b1b;
    z-index: 0;
    opacity: 0;
    transform: rotate(45deg);
    transform-origin: bottom right;
    transition: all 0.3s ease;
}

.anim-button:hover::after {
    opacity: 1;
    transform: rotate(0deg);
}
</style>