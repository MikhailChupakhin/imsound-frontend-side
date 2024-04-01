<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\checkout\RecipientForm.vue -->

<template>
    <p class="section-title">Данные получателя</p>
    <form class="form-container">
        <div v-for="(field, key) in props.formFields" :key="key" class="field" :style="{ order: field.order }">
            <label :for="key">{{ field.label }}</label>
            <input :id="key" :type="field.type" :placeholder="field.placeholder" v-model="formData[key]" :required="field.required"
                class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                :class="{ 'error-field': formErrors[key] }">
            <div v-if="formErrors[key]" class="form-error">{{ formErrors[key] }}</div>
        </div>
    </form>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    formFields: Object,
    formData: Object,
    provinceOptions: Object,
    errors: Object
});

const formData = ref(props.formData || {});
const provinceOptions = ref(props.provinceOptions);

const formErrors = ref(props.errors || {});
console.log('errors in RecipientForm', formErrors);

</script>

<style scoped>
.form-container {
    display: flex;
    flex-direction: column;
}
.section-title {
    font-size: 1.8rem;
    font-weight: 500;
}
.error-field {
  border-color: red !important;
}
.form-error {
  color: red;
  font-size: 0.8em;
  margin-top: 0.5em;
  margin-left: 0.8rem;
}
</style>