<template>
    <div class="call-me-container grid">
        <div class="col image-wrapper">
            <div class="hotline-image">
                <img src="/assets/img/hotline.webp" alt="Hotline Image" class="w-full max-w-full">
            </div>
        </div>
        <div class="col text-center">
            <div class="text-section">
                <div class="text-xl font-bold">Хочешь доебаться, ниггер?</div>
                <p>Позвони мне, и попиздим, сука.</p>
            </div>
        </div>
        <div class="col text-center">
            <div class="call-me-number"><strong>+1 234 567 890</strong></div>
            <div class="mt-4">
                <CommonInterfaceButton buttonText="перезвоните мне!" @click="openBuyOneClickModal(productInfo)" :customStyle="{ width: '100%' }" />
            </div>
        </div>
    </div>
    <BuyOneClickModal v-if="showBuyOneClickModal" :productInfo="buyoneclickProduct"
                                                  :is-visible="showBuyOneClickModal"
                                                  @close-modal="closeBuyOneClickModal" />
</template>

<script setup>
import BuyOneClickModal from '../productcard/BuyOneClickModal.vue';
const showBuyOneClickModal = ref(false);
const buyoneclickProduct = ref(null);

const props = defineProps({
    productInfo: {
        type: Object,
        required: true
    }
});
const openBuyOneClickModal = (data) => {
  buyoneclickProduct.value = data;
  showBuyOneClickModal.value = true;
  document.body.classList.add('body-locked');
};
const closeBuyOneClickModal = () => {
  showBuyOneClickModal.value = false;
  document.body.classList.remove('body-locked');
};
</script>

<style scoped>
.hotline-image {
    max-width: 350px;
    height: auto;
}
.call-me-container {
    border-radius: 5px;
    border: 0.1px solid black;
}
.call-me-number {
    font-size: 1.7rem;
}
@media screen and (max-width: 700px) {
    .image-wrapper {
        display: none;
    }
    .call-me-number {
        font-size: 1.25rem;
    }   
}

</style>