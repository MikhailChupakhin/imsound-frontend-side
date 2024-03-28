<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\productcard\Quantity.vue -->

<template>
    <div class="quantity-control">
        <button class="quantity-btn" @click="decrement">-</button>
        <input class="quantity-input" type="number" v-model="quantity" min="1" :max="maxValue" @change="updateQuantity" />
        <button class="quantity-btn" @click="increment">+</button>
    </div>
</template>
  
<script>
import { ref } from 'vue';

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

        const showError = (message) => {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = message;
        errorMessage.classList.add('error-message');
        document.body.appendChild(errorMessage);

        setTimeout(() => {
            errorMessage.classList.add('fade-in');
        }, 10);

        setTimeout(() => {
            errorMessage.classList.remove('fade-in');
            errorMessage.classList.add('fade-out');
        }, 800);

        setTimeout(() => {
            errorMessage.remove();
        }, 1500);
        };

        const decrement = () => {
            if (quantity.value > 1) {
                quantity.value--;
                emit('quantity-change', quantity.value);
            } else {
                showError('Зачем ты это делаешь?');
            }
        };

        const increment = () => {
            console.log(quantity.value, props.maxValue)
            if (props.initialQuantity + quantity.value <= props.maxValue) {
                quantity.value++;
                emit('quantity-change', quantity.value);
            } else {
                showError('Увы, больше нет...');
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
    width: 1.8rem;
    height: 1.8rem;
    text-align: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 50%;
}

.quantity-input {
    margin-left: 1px;
    margin-right: 1px;
    width: 2.5rem;
    height: 2rem;
    text-align: center;
    font-size: 1.1rem;
    padding: 0.3rem;
    -moz-appearance: textfield;
    appearance: textfield;
}

.quantity-input::-webkit-outer-spin-button,
.quantity-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>