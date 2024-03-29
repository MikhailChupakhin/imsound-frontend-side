// C:\Users\user1\VSCProjects\imsound-frontend-side\store\comparison.js

import { createStore } from 'vuex';

const comparisonList = createStore({
  state() {
    return {
      comparisonItems: [],
    };
  },
  mutations: {
    addItem(state, { productInfo }) {
      const newItem = {
        productInfo: productInfo,
      };
      state.comparisonItems.push(newItem);
    },
    removeItem(state, productId) {
      state.comparisonItems = state.comparisonItems.filter(item => String(item.productInfo.id) !== String(productId));
    },
    resetComparison(state) {
      state.comparisonItems = [];
    }
  },
  getters: {
    getComparisonItems(state) {
      return state.comparisonItems;
    },
  }
});

export default comparisonList;