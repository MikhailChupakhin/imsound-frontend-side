import { defineNuxtPlugin } from '#app';
import bodyLock from '@/directives/bodyLock';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('body-lock', bodyLock);
});