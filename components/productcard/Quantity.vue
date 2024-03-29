<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productcard\Quantity.vue -->

<template>
    <div class="quantity-control">
        <div class="quantity-btn decr" @click="decrement($event)">-</div>
        <input class="quantity-input" type="number" v-model="quantity" min="1" :max="maxValue" @change="updateQuantity" />
        <div class="quantity-btn incr" @click="increment($event)">+</div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { showError } from '~/utils/animations/showError';

export default {
    props: {
        initialQuantity: {
            type: Number,
            default: 1
        },
        maxValue: {
            type: Number,
        }
    },
    setup(props, { emit }) {
        const quantity = ref(props.initialQuantity);

        const decrement = (event) => {
            if (quantity.value > 1) {
                quantity.value--;
                emit('quantity-change', quantity.value);
            } else {
                const x = event.clientX;
                const y = event.clientY;
                const message = 'Хули ты делаешь?'
                showError(message, x, y);
            }
        };

        const increment = (event) => {
            console.log(quantity.value, props.maxValue)
            if (props.initialQuantity + quantity.value <= props.maxValue) {
                quantity.value++;
                emit('quantity-change', quantity.value);
            } else {
                const x = event.clientX;
                const y = event.clientY;
                const message = 'Увы, больше у нас нет...'
                showError(message, x, y);
            }
        };

        const updateQuantity = () => {
            emit('quantity-change', quantity.value);
        };

        return {
            quantity,
            decrement,
            increment,
            updateQuantity,
            maxValue: props.maxValue
        };
    }
};
</script>

<style scoped>
.quantity-control {
    display: flex;
    align-items: center;
}

.quantity-btn {
    width: 2rem;
    height: 2rem;
    text-align: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    background-color: #dddddd;
    border: none;
    -webkit-tap-highlight-color: transparent;
    -moz-focus-inner: none;
    outline: none;
    line-height: 1.8rem;
}
.quantity-btn.decr {
    border-top-left-radius: 40%;
    border-bottom-left-radius: 40%;
}
.quantity-btn.incr {
    border-top-right-radius: 40%;
    border-bottom-right-radius: 40%;
}

.quantity-btn:active {
    outline: none;
    background-color: #b3b2b2;
    box-shadow: none;
}

.quantity-input {
    width: 2.5rem;
    height: 2rem;
    text-align: center;
    font-size: 1.1rem;
    padding: 0.3rem;
    -moz-appearance: textfield;
    appearance: textfield;
    border: 0.2px solid #ccc;
    border-radius: 0;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>