// C:\Users\user1\VSCProjects\imsound-frontend-side\store\useAuthStore.js

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('isAuthenticated', {
    state: () => ({
        isAuthenticated: false,
        isAuthenticatedCheckInit: false
      }),
    
      actions: {
        setAuthenticated(isAuthenticated) {
          this.isAuthenticated = isAuthenticated;
        },
        setAuthenticatedCheckInit(value) {
          this.isAuthenticatedCheckInit = value;
        }
      },
})