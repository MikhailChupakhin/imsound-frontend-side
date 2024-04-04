<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\pages\users\checkout-auth.vue -->

<template>
  <Head :metaTitle="pageTitle" :metaDescription="metaDescription" />
  <MainHeader />
  <BreadcrumbsNav />
  <div class="main_container">
    <div class="grid" v-if="response">
      <div class="col-6">
        <CheckoutRecipientForm :formFields="formFields" :formData="formData" :provinceOptions="provinceOptions"
          :errors="errors" />
      </div>
      <div class="col-6">
        <CheckoutOutput :cartItems="cartItems" :deliveryMethodData="response.selected_delivery_method"
          :paymentMethods="response.payment_methods" :handleCheckout="handleCheckout" />
      </div>
    </div>
    <div v-else>
      Загрузка...
    </div>
  </div>
  <FooterBottom />
</template>

<script setup>
import Head from '~/components/common/Head.vue';
import MainHeader from '~/components/header/MainHeader.vue';
import BreadcrumbsNav from '~/components/common/BreadcrumbsNav.vue';
import FooterBottom from '~/components/footer/FooterBottom.vue';
import { useBaseStore } from '~/store/baseData';

import { useAuthStore } from '~/store/useAuthStore';
const authData = useAuthStore();
const isAuthenticated = ref(authData.isAuthenticated);

const route = useRoute();
const config = useRuntimeConfig();
const BASE_API_URL = config.public.apiBase;

const router = useRouter();
const response = ref(null);
const deliveryMethod = route.query.deliveryMethod;

const baseStore = useBaseStore();
const baseData = baseStore.baseResponse;
provide('categories', baseData.categories);
provide('subcategories', baseData.subcategories);
provide('breadcrumbs', [["/", "Главная"], ["/users/cart/", "Корзина пользователя"], ["/users/checkout/", "Оформление заказа"]]);

const BASE_BRANDNAME = config.public.brandName;

const pageTitle = ref(`${BASE_BRANDNAME} - Корзина пользователя`);
const metaDescription = ref(`${BASE_BRANDNAME} - Корзина пользователя`);

if (process.client) {
  (async () => {
    if (isAuthenticated.value) {
      const endpoint = 'orders/checkout/auth/';
      const urlWithQuery = `${endpoint}?deliveryMethod=${deliveryMethod}`;
      const apiResponse = await authRequestHandler(BASE_API_URL, urlWithQuery, 'GET');
      response.value = await apiResponse.json();
    } else {
      const endpoint = 'orders/checkout/guest/';
      const urlWithQuery = `${endpoint}?deliveryMethod=${deliveryMethod}`;
      const apiResponse = await guestRequestHandler(BASE_API_URL, urlWithQuery, 'GET');
      response.value = await apiResponse.json();
    } 
  })();
}

const formFields = computed(() => {
  return response.value ? response.value.selected_delivery_method.form_fields : null;
});

const provinceOptions = computed(() => {
  return response.value ? response.value.PROVINCE_CHOICES : null;
});

const cartItems = computed(() => {
  return response.value ? response.value.cart_items : null;
});

const formData = ref({
  first_name: '',
  last_name: '',
  address: '',
  company: '',
  zipcode: '',
  city: '',
  province: '',
  phone: '',
  aux_phone: '',
  email: ''
});

import CheckoutOutput from '~/components/checkout/CheckoutOutput.vue';
import CartStore from '~/store/cart';


const handleCheckout = async (selectedPaymentMethod) => {
  const recipientFormData = formData.value;
  const requiredFields = getRequiredFields();

  if (!validateFormData(recipientFormData, requiredFields)) {
    return;
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    ...recipientFormData,
    payment_method: selectedPaymentMethod,
  });

  try {
    if (isAuthenticated.value) {
      const endpoint = 'orders/checkout/auth/';
      const response = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
      if (response.status === 201) {
        CartStore.commit('resetCart');
        router.push({ path: '/users/order-success' });
      } else {
        console.log(response.status)
      }
    } else {
      const endpoint = 'orders/checkout/guest/';
      const response = await guestRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
      if (response.status === 201) {
        CartStore.commit('resetCart');
        router.push({ path: '/users/order-success' });
      } else {
        console.log(response.status)
      }
    }
  } catch (error) {
    console.error('Произошла ошибка при выполнении запроса:', error);
  }
};

const getRequiredFields = () => {
  const requiredFields = [];
  for (const key in formFields.value) {
    if (formFields.value.hasOwnProperty(key)) {
      const field = formFields.value[key];
      if (field.required) {
        requiredFields.push(key);
      }
    }
  }
  return requiredFields;
};

const errors = ref({});

const validateFormData = (formData, requiredFields) => {

  const phoneRegex = /^(8|(\+7))9\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  for (const key of requiredFields) {
    if (!formData[key]) {
      errors.value[key] = `Поле "${formFields.value[key].label}" обязательно для заполнения`;
    } else {
      if (key === 'phone' || key === 'aux_phone') {
        if (!phoneRegex.test(formData[key])) {
          errors.value[key] = `Неправильный формат телефона в поле "${formFields.value[key].label}"`;
        }
      }
      if (key === 'email') {
        if (!emailRegex.test(formData[key])) {
          errors.value[key] = `Неправильный формат email в поле "${formFields.value[key].label}"`;
        }
      }
    }
  }

  if (Object.keys(errors.value).length > 0) {
    console.error('Ошибки валидации в родительском компоненте:', errors.value);
    return false;
  }

  return true;
};

</script>

<style scoped>
.main_container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
}
</style>