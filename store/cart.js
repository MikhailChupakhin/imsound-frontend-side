// C:\Users\user1\VSCProjects\imsound-frontend-side\store\cart.js

import { createStore } from 'vuex';

const CartStore = createStore({
  state() {
    return {
      cartItems: [],
      cartTotalPrice: 0,
      deliveryMethod: {'unselected': '0'}
    };
  },
  mutations: {
    addCartItem(state, { productInfo, quantity }) {
      const newItem = {
        productInfo: productInfo,
        quantity: quantity
      };
      state.cartItems.push(newItem);
    },
    updateCartItem(state, { productInfo, quantity }) {
      const cartItemIndex = state.cartItems.findIndex(item => item.productInfo.id === productInfo.id);
      if (cartItemIndex !== -1) {
        state.cartItems[cartItemIndex].quantity = quantity;
      }
    },
    removeCartItem(state, productId) {
      console.log('productId', productId)
      state.cartItems = state.cartItems.filter(item => String(item.productInfo.id) !== String(productId));
    },
    updateTotalPrice(state, totalPrice) {
      state.cartTotalPrice = totalPrice;
    },
    setDeliveryMethod(state, method) {
      state.deliveryMethod = method;
    },
    resetCart(state) {
        state.cartItems = [];
        state.cartTotalPrice = 0;
        state.deliveryMethod = {'unselected': '0'};
    }
  },
  actions: {
    addProductToCart(context, product) {
      context.commit('addToCart', product);
      context.commit('updateTotalPrice', context.state.cartTotalPrice + product.price);
    },
    // Другие действия, которые могут понадобиться для управления корзиной
  },
  getters: {
    getCartItems(state) {
      return state.cartItems;
    },
    getCartTotalPrice(state) {
      return state.cartTotalPrice;
    },
    getDeliveryMethod(state) {
      return state.deliveryMethod;
    },
  }
});

export default CartStore;