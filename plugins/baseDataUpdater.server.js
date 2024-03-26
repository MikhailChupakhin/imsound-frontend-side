// C:\Users\user1\VSCProjects\imsound-frontend-side\plugins\baseDataUpdater.server.js    

import { defineNuxtPlugin } from '#app';
import { useBaseStore } from '~/store/baseData';

const BASE_API_URL = 'https://imsound.ru/api/';
const endpointBase = 'base/';
const updateInterval = 10 * 60 * 1000000;

async function updateBaseData() {
    try {
        console.log('Updating base data...');

        const response = await $fetch(`${BASE_API_URL}${endpointBase}`);
        console.log(response.value)
        const baseStore = useBaseStore();
        
        // if (newData) {
        //     baseStore.setBaseResponse(newData);
        //     console.log('Base data updated successfully.');
        // } else {
        //     console.log('No new data received.');
        // }
    } catch (error) {
        console.error('Error updating base data:', error);
    } finally {
        setTimeout(updateBaseData, updateInterval);
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        console.log('Running on client side.');
        const authStore = useAuthStore();
        nuxtApp.provide('authStore', authStore);
    } else {
        console.log('Base data updater plugin - Running on server side.');
        nuxtApp.hook('app:created', () => {
            updateBaseData();
        });
    }
});

