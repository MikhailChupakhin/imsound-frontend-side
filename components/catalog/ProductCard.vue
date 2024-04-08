<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\catalog\ProductCard.vue -->

<template>
  <div :class="{ 'product-card text-center': true, 'comparison': isInComparisonList }" @mouseenter="showCartButton"
    @mouseleave="hideCartButton">
    <div class="card-image">
      <router-link :to="`/catalog/${productInfo.slug}_${productInfo.id}`">
        <img class="product-img" :src="productInfo.image" alt="{{ productInfo.name }} Image" loading="lazy">
      </router-link>
      <div class="flex flex-column card-menu">
        <div class="card-icon" @click="fetchDetailData(productInfo.id)" title="Подробнее">
          <svg width="2rem" height="2rem" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m16 0c8.836556 0 16 7.163444 16 16s-7.163444 16-16 16-16-7.163444-16-16 7.163444-16 16-16zm0 2c-7.7319865 0-14 6.2680135-14 14s6.2680135 14 14 14 14-6.2680135 14-14-6.2680135-14-14-14zm0 18.5c.7731986 0 1.4.6268014 1.4 1.4s-.6268014 1.4-1.4 1.4-1.4-.6268014-1.4-1.4.6268014-1.4 1.4-1.4zm0-11.5c2.209139 0 4 1.790861 4 4 0 1.8635652-1.2743978 3.429479-2.9992387 3.8737865l-.0007613 1.1262135c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1v-2c0-.5522847.4477153-1 1-1 1.1045695 0 2-.8954305 2-2s-.8954305-2-2-2-2 .8954305-2 2c0 .5522847-.4477153 1-1 1s-1-.4477153-1-1c0-2.209139 1.790861-4 4-4z" />
          </svg>
        </div>
        <div class="card-icon mt-2" @click="handleComparison(productInfo, $event)" title="Сравнение">
          <svg width="2rem" height="2rem" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g id="Product_price_comparison">
              <path
                d="M230.7843,318.5234a21.0094,21.0094,0,0,0-20.9024-18.707h-29.26V273.5928a45.6919,45.6919,0,1,0-91.3838,0v26.2236h-29.26a21.0078,21.0078,0,0,0-20.9014,18.707L24.4815,449.7441a35.0092,35.0092,0,0,0,34.7949,38.88h150.795a35.467,35.467,0,0,0,35.2509-39.3886ZM101.2384,273.5928a33.6919,33.6919,0,1,1,67.3838,0v26.2236H101.2384ZM227.5606,468.8057a23.4968,23.4968,0,0,1-17.4892,7.8183H59.2764A23.0112,23.0112,0,0,1,36.4073,451.07L51.003,319.8486a9.0214,9.0214,0,0,1,8.9756-8.0322h29.26V336.69h12V311.8164h67.3838V336.69h12V311.8164h29.26a9.0239,9.0239,0,0,1,8.9766,8.0332l14.5381,130.7119A23.4966,23.4966,0,0,1,227.5606,468.8057Z" />
              <path
                d="M134.6807,348.7537a50.1675,50.1675,0,1,0,50.1674,50.1674A50.2242,50.2242,0,0,0,134.6807,348.7537Zm3.6728,69.36v7.2337h-9V418.23h-9.4424v-9h16.7617a4.5659,4.5659,0,1,0,0-9.1318H132.999a12.58,12.58,0,0,1-2.6758-24.8731v-7.4121h9v7.1191h10.4131v9H132.999a3.5831,3.5831,0,0,0,0,7.1661h3.6738a13.56,13.56,0,0,1,1.6807,27.0163Z" />
              <path
                d="M489.609,449.2354l-14.5381-130.712a21.0094,21.0094,0,0,0-20.9024-18.707h-29.26V273.5928a45.6919,45.6919,0,1,0-91.3838,0v26.2236h-29.26a21.0076,21.0076,0,0,0-20.9013,18.707L268.7681,449.7441a35.0092,35.0092,0,0,0,34.795,38.88H454.358a35.4672,35.4672,0,0,0,35.251-39.3886ZM345.525,273.5928a33.6919,33.6919,0,1,1,67.3838,0v26.2236H345.525ZM471.8472,468.8057a23.4965,23.4965,0,0,1-17.4892,7.8183H303.5631A23.0113,23.0113,0,0,1,280.6939,451.07L295.29,319.8486a9.0214,9.0214,0,0,1,8.9756-8.0322h29.26V336.69h12V311.8164h67.3838V336.69h12V311.8164h29.26a9.0239,9.0239,0,0,1,8.9766,8.0332l14.5381,130.7119A23.4963,23.4963,0,0,1,471.8472,468.8057Z" />
              <path
                d="M378.9673,348.7537a50.1675,50.1675,0,1,0,50.1675,50.1674A50.2242,50.2242,0,0,0,378.9673,348.7537Zm3.6728,69.36v7.2337h-9V418.23h-9.4423v-9H380.96a4.5659,4.5659,0,1,0,0-9.1318h-3.6739a12.58,12.58,0,0,1-2.6757-24.8731v-7.4121h9v7.1191h10.413v9H377.2856a3.5831,3.5831,0,0,0,0,7.1661H380.96A13.56,13.56,0,0,1,382.64,418.114Z" />
              <path
                d="M340.7627,115.2312c-2.9829-2.3994-6.6953-5.3855-7.3286-7.3392-.7041-2.1673.5722-6.9357,1.5981-10.767,1.8482-6.903,3.9424-14.7271-.393-20.6843-4.3731-6.0083-12.5088-6.4256-19.6871-6.794-3.9272-.2014-8.8134-.4519-10.6-1.7514-1.7343-1.2624-3.4565-5.7874-4.8413-9.4229-2.5752-6.7659-5.4951-14.4342-12.6465-16.7558-6.91-2.2442-13.6357,2.1259-19.57,5.9821-3.5547,2.3085-7.582,4.9248-9.9633,4.9248s-6.4087-2.6163-9.962-4.9248c-5.936-3.8552-12.6626-8.2278-19.5708-5.9821-7.1508,2.3216-10.0708,9.99-12.6464,16.7553-1.3843,3.6355-3.107,8.1605-4.8414,9.4224-1.7861,1.3-6.6723,1.5506-10.6,1.7519-7.1782.3684-15.3139.7857-19.687,6.794-4.3354,5.9573-2.2412,13.781-.393,20.6838,1.0258,3.8318,2.3022,8.6,1.5986,10.7675-.6338,1.9532-4.3457,4.9393-7.3286,7.3388-5.6851,4.5733-12.1284,9.7568-12.1284,17.3893s6.4433,12.8159,12.1284,17.3893c2.9829,2.3995,6.6948,5.3856,7.3286,7.3388.7036,2.1667-.5728,6.9353-1.5986,10.767-1.8482,6.9029-3.9429,14.7266.392,20.6834,4.3731,6.0093,12.51,6.4265,19.688,6.7949,3.9263.2013,8.8125.4519,10.5987,1.7514,1.7343,1.2623,3.457,5.7873,4.8413,9.4229,2.5757,6.7654,5.4956,14.4336,12.6465,16.7558,6.9072,2.2423,13.6352-2.1269,19.5708-5.9821,3.5542-2.3086,7.582-4.9248,9.9629-4.9248s6.4086,2.6162,9.9633,4.9248c4.815,3.1278,10.15,6.5935,15.6812,6.5935a12.4968,12.4968,0,0,0,3.8891-.6114c7.1514-2.3217,10.0713-9.99,12.6465-16.7553,1.3848-3.6361,3.107-8.1606,4.8413-9.423,1.7862-1.2994,6.6724-1.55,10.5987-1.7513,7.1782-.3684,15.3149-.7856,19.688-6.7941,4.3354-5.9567,2.24-13.78.393-20.6832-1.0259-3.8318-2.3022-8.6-1.5981-10.7685.6333-1.9532,4.3457-4.9393,7.3286-7.3388,5.6841-4.5734,12.1274-9.7567,12.1274-17.3893S346.4468,119.8041,340.7627,115.2312Zm-96.499,44.6433a5.4994,5.4994,0,0,1-5.21,3.7383h-6.6309a5.4981,5.4981,0,0,1-5.2041-3.7217l-16.7807-49.11h11.6235l13.667,39.9954,13.5254-39.9954h11.6113Zm42.26,3.7383H265.5859v-11h20.9375a5.8235,5.8235,0,0,0,0-11.647h-4.5888a15.5962,15.5962,0,1,1,0-31.1924H302.84v11H281.9346a4.5962,4.5962,0,1,0,0,9.1924h4.5888a16.8235,16.8235,0,0,1,0,33.647Z" />
            </g>
          </svg>
        </div>
        <div class="card-icon mt-2" @click="handleBuyoneclick(productInfo)" title="Купить в 1 клик">
          <svg width="2rem" height="2rem" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 96 96">
            <path
              d="M41.35,77A37.48,37.48,0,1,1,70.51,63.06,1,1,0,0,1,69,61.8a35.39,35.39,0,1,0-10.23,8.65,1,1,0,1,1,1,1.74A37.55,37.55,0,0,1,41.35,77Z" />
            <path
              d="M41.35,54.49c-5.46,0-9.9-3.57-9.9-8a1,1,0,0,1,2,0c0,3.28,3.54,6,7.9,6s7.9-2.68,7.9-6c0-2.76-2.58-4.66-8.13-6-6.51-1.56-9.67-4.16-9.67-7.94,0-4.39,4.44-8,9.9-8s9.9,3.57,9.9,8a1,1,0,0,1-2,0c0-3.28-3.54-6-7.9-6s-7.9,2.68-7.9,6c0,2.72,2.66,4.68,8.13,6,4.15,1,9.67,2.9,9.67,7.94C51.25,50.92,46.81,54.49,41.35,54.49Z" />
            <path d="M41.35,59.33a1,1,0,0,1-1-1V20.65a1,1,0,0,1,2,0V58.33A1,1,0,0,1,41.35,59.33Z" />
            <path
              d="M83.7,94a1,1,0,0,1-.71-.29l-13.5-13.5-3,8a1,1,0,0,1-.93.65h0a1,1,0,0,1-.94-.64L52.39,56.45a1,1,0,0,1,.23-1.07,1,1,0,0,1,1.07-.22L85.4,67.42a1,1,0,0,1,0,1.87l-8,3L89.88,84.69A1,1,0,0,1,90,86l-5.47,7.6a1,1,0,0,1-.73.42ZM69.1,77.4a1,1,0,0,1,.71.3L83.58,91.46l4.28-5.95L74.93,72.57a1,1,0,0,1,.36-1.64l6.94-2.6L55.07,57.84,65.57,85l2.6-6.94a1,1,0,0,1,.72-.63Z" />
            <path
              d="M80.4,60.16a1,1,0,0,1-.86-.48,1,1,0,0,1,.34-1.37L90.62,51.8a1,1,0,0,1,1.38.34,1,1,0,0,1-.34,1.37L80.91,60A1,1,0,0,1,80.4,60.16Z" />
            <path
              d="M81.3,53.66a1,1,0,0,1-.49-.14,1,1,0,0,1-.37-1.36l5.29-9.23a1,1,0,0,1,1.74,1l-5.3,9.23A1,1,0,0,1,81.3,53.66Z" />
            <path
              d="M46.23,91.3a1,1,0,0,1-.82-.44,1,1,0,0,1,.26-1.39L56.05,82.4a1,1,0,0,1,1.13,1.65L46.8,91.13A1.08,1.08,0,0,1,46.23,91.3Z" />
            <path d="M39.72,83.34a1,1,0,0,1-.1-2l10.6-1a1,1,0,0,1,.19,2l-10.6,1Z" />
          </svg>
        </div>
      </div>
    </div>
    <div class="card-content">
      <h2>
        <router-link :to="`/catalog/${productInfo.slug}_${productInfo.id}`">
          {{ productInfo.name }}
        </router-link>
      </h2>
      <div class="total-price"><a>{{ formatPrice(visiblePrice) }}</a></div>
      <div v-if="productInfo.quantity > 0" class="flex justify-content-center mb-4">
        <QuantityVue :initialQuantity="1" :max-value="productInfo.quantity" @quantity-change="updateQuantity" />
      </div>
      <div v-else class="not-available-text mb-4">Нет в наличии</div>
      <div v-if="viewMode === 'list'">
        <div v-if="productInfo.quantity > 0">
          <CommonInterfaceButton buttonText="в корзину" @click="handleAddToCartClick(productInfo, $event)" />
        </div>
        <div v-else class="cart-btn-wrapper">
          <CommonInterfaceButton buttonText="предзаказ" @click="handleBuyoneclick(productInfo)"
            :customStyle="{ 'background-color': 'rgb(193, 111, 111)' }" />
        </div>
        <div class="descr-wrapper">
          <Divider />
          <div class="descr-header">Описание</div>
          <Divider />
          <div v-if="productInfo.description">
            <div class="card-description" v-html="productInfo.description"></div>
          </div>
          <div v-else>
            Товару не добавлено описание.
          </div>
        </div>
      </div>
    </div>
    <div v-if="viewMode === 'grid'">
      <div v-if="productInfo.quantity > 0" class="cart-btn-wrapper">
        <button :id="'addToCartButton_' + productInfo.id" class="add-to-cart-btn" ref="cartButton"
          @click="handleAddToCartClick(productInfo, $event)">в корзину</button>
      </div>
      <div v-else class="cart-btn-wrapper">
        <button class="add-to-cart-btn preorder-btn" ref="cartButton"
          @click="handleBuyoneclick(productInfo)">предзаказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '~/utils/priceFormatter.js';
import QuantityVue from '~/components/productcard/Quantity.vue';
import CartStore from '~/store/cart.js';
import comparisonList from '~/store/comparison.js';
import { showMessage } from '~/utils/animations/showMessage';
import { flyToCartAnimation } from '~/utils/animations/flyToCart';
import Divider from 'primevue/divider';

export default {
  components: {
    QuantityVue
  },
  props: {
    productInfo: {
      type: Object,
      required: true
    },
    openQuickviewModal: {
      type: Function,
    },
    openBuyOneClickModal: {
      type: Function,
    },
    isAuthenticated: {
      type: Boolean,
    },
    viewMode: {
      type: String,
    }
  },
  setup(props) {
    const ImgIsLoading = ref(true);
    const selectedQuantity = ref(1);

    const visiblePrice = computed(() => {
      return props.productInfo.total_price * selectedQuantity.value;
    });

    const isInComparisonList = computed(() => {
      return comparisonList.state.comparisonItems.some(item => item.productInfo.id === props.productInfo.id);
    });

    return {
      ImgIsLoading,
      visiblePrice,
      selectedQuantity,
      isInComparisonList
    };
  },
  methods: {
    updateQuantity(newQuantity) {
      this.selectedQuantity = newQuantity;
      this.visiblePrice = this.productInfo.total_price * newQuantity;
    },
    showCartButton() {
      this.$refs.cartButton.style.opacity = '1';
    },
    hideCartButton() {
      this.$refs.cartButton.style.opacity = '0';
    },
    imageLoaded() {
      this.ImgIsLoading = false;
    },
    handleAddToCartClick(productInfo, event) {
      const xA = event.clientX;
      const yA = event.clientY;

      const cartButton = document.getElementById('cart-button');
      const buttonRect = cartButton.getBoundingClientRect();

      const headerRect = document.querySelector('header').getBoundingClientRect();
      const xB = buttonRect.left + window.scrollX - headerRect.left - 30;
      const yB = buttonRect.top - headerRect.top;

      if (this.isAuthenticated) {
        this.addToCartAUTH(productInfo, this.selectedQuantity, xA, yA, xB, yB);
      } else {
        this.addToCartGUEST(productInfo, this.selectedQuantity, xA, yA, xB, yB);
      }
    },
    async addToCartAUTH(productInfo, quantity = 1, xA, yA, xB, yB) {
      try {
        const config = useRuntimeConfig();
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'baskets/add/';

        const headers = {
          'Content-Type': 'application/json',
        };
        const body = JSON.stringify({
          product_id: productInfo.id,
          quantity: quantity
        });

        const response = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
        const responseData = await response.json();

        if (responseData.code === 0 || responseData.code === 1) {
          CartStore.commit('addCartItem', { productInfo, quantity });
          const productImg = this.$el.querySelector('.product-img');
          await flyToCartAnimation(productImg, this, xA, yA, xB, yB);
        } else if (responseData.code === 2) {
          console.log(responseData.message);
        }
      } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
      }
    },
    async addToCartGUEST(productInfo, quantity = 1, xA, yA, xB, yB) {
      try {
        const config = useRuntimeConfig();
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'baskets/add-guest/';

        const headers = {
          'Content-Type': 'application/json',
        };
        const body = JSON.stringify({
          product_id: productInfo.id,
          quantity: quantity
        });

        const response = await guestRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
        const responseData = await response.json();

        if (responseData.code === 0 || responseData.code === 1) {
          CartStore.commit('addCartItem', { productInfo, quantity });
          const productImg = this.$el.querySelector('.product-img');
          await flyToCartAnimation(productImg, this, xA, yA, xB, yB);
        } else if (responseData.code === 2) {
          console.log(responseData.message);
        }
      } catch (error) {
        console.error('Ошибка при добавлении товара в корзину:', error);
      }
    },
    async fetchDetailData(product_id) {
      try {
        const config = useRuntimeConfig();
        const BASE_API_URL = config.public.apiBase;
        const endpoint = 'product/quick-view/' + product_id;
        const apiUrl = BASE_API_URL + endpoint;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Ошибка выполнения запроса');
        }
        const data = await response.json();
        this.openQuickviewModal(data);
      } catch (error) {
        console.error('Ошибка при выполнении апи запроса:', error);
      }
    },
    async handleComparison(productInfo, event) {
      const x = event.clientX;
      const y = event.clientY;
      const comparisonItems = comparisonList.state.comparisonItems;
      const productIndex = comparisonItems.findIndex(item => item.productInfo.id === productInfo.id);

      if (productIndex !== -1) {
        comparisonList.commit('removeItem', productInfo.id);
        const message = 'Удалил из списка сравнения';
        showMessage(message, x, y);
      } else {
        comparisonList.commit('addItem', { productInfo });
        const message = 'Добавил в список сравнения';
        showMessage(message, x, y);
      }
    },
    handleBuyoneclick(productInfo) {
      this.openBuyOneClickModal(productInfo)
    }
  }
};
</script>

<style scoped>
.product-img {
  width: 100%;
}
h2 {
  margin-block-start: 0.3rem;
  margin-block-end: 0.3rem;
}
@media screen and (min-width: 787px) {
  h2 {
    margin-block-start: 0.1rem;
    margin-block-end: 0.1rem;
  }
}
h2 a {
  line-height: 1.1rem;
  display: block;
  font-weight: 500;
  font-size: 1.1rem;
  color: #272727;
  text-decoration: none;
  text-transform: capitalize;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
@media screen and (max-width: 480px) {
  h2 a {
    line-height: 1rem;
    font-size: 1rem;
    font-weight: 500;
    height: 2rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
}
.total-price {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
.product-card {
  display: flex;
  flex-direction: column;
  position: relative;
}
.add-to-cart-btn {
  width: 33%;
  background-color: rgba(246, 160, 23);
  color: #000000;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 10px;
  border: 1px solid gray;
  cursor: pointer;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in-out;
  z-index: 5;
}

.preorder-btn {
  background-color: rgb(193, 111, 111);
}

@media screen and (min-width: 601px) {
  .add-to-cart-btn {
    opacity: 0;
  }
}

@media screen and (max-width: 475px) {
  .add-to-cart-btn {
    width: 6.5rem;
  }
}
.card-image {
  position: relative;
}
.card-menu {
  align-items: center;
  position: absolute;
  top: 25%;
  right: 10px;
  transform: translateY(-50%);
  padding: 5px 3px;
  background-color: rgba(238, 238, 238, 0.7);
  border-radius: 10px;
  z-index: 8;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.product-card:hover .card-menu {
  opacity: 1;
}

.product-card:hover .add-to-cart-btn {
  opacity: 1;
}

.card-icon:hover {
  fill: #8B0000;
}

.card-menu .icon {
  width: 1.5rem;
  height: 1.5rem;
  fill: #000;
  margin-bottom: 10px;
}

.product-card.comparison::after {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid rgb(149, 25, 25);
  top: -1px;
  right: -6px;
  transform: rotate(45deg);
  z-index: 5;
}

.not-available-text {
  line-height: 2rem;
  font-size: 0.8rem;
}

.mobile-bumper {
  display: none;
}

@media screen and (max-width: 600px) {
  .card-menu {
    opacity: 1;
  }

  .mobile-bumper {
    display: block;
    height: 1rem;
  }

  .add-to-cart-btn {
    opacity: 1;
  }
}

@media screen and (max-width: 600px) {
  .product-card {
    position: relative;
    margin-bottom: 1rem;
  }

  .add-to-cart-btn {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
  }
}

@media (max-width: 767px) {
  .descr-wrapper {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .list-mode .product-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
  }

  .list-mode .product-card {
    width: 50%;
    height: 100%;
  }

  .list-mode .product-card .card-content {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
}

.descr-header {
  font-size: 1.5rem;
  font-weight: 400px;
}

.card-description {
  padding-left: 10px;
  padding-right: 10px;
  max-height: 22rem;
  overflow-y: auto;
}

.product-card:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border: 2px solid transparent;
  box-sizing: border-box;
  z-index: 1;
  box-shadow: 0 0 5px 5px rgba(97, 97, 97, 0.5);
  filter: blur(1px);
}
</style>