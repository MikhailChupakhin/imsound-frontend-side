<!-- C:\Users\user1\VSCProjects\imsound-frontend-side\components\index\SubscriptionEmail.vue -->

<template>
    <div class="newsletter">
		<div class="container">
			<div class="row">
                <div class="col-10 col-offset-1">
                    <div class="newsletter_content text-center">
                        <div class="newsletter_title">Подпишитесь на наши новости!</div>
                        <div class="newsletter_text">
                            <p>Оставьте адрес электронной почты - мы будем держать Вас в курсе о проводимых акциях и новинках.</p>
                        </div>
                        <div>
                            <form @submit.prevent="subscribe" class="newsletter_form">
                                <input type="hidden">
                                <input v-model="email" type="email" class="newsletter_input" required="required">
                                <ButtonAnimated buttonText="Подписаться" :handleClick="subscribe" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>
    
<script>
import axios from 'axios';
import ButtonAnimated from '~/components/common/ButtonAnimated.vue';

export default {
    data() {
        return {
            email: ''
        };
    },
    methods: {
        subscribe() {
            const config = useRuntimeConfig()
            const BASE_API_URL = config.public.apiBase;
            const endpoint = 'users/subscribe_news/';
            const apiURL = BASE_API_URL + endpoint;
            axios.post(apiURL, {
                email: this.email
            })
            .then(response => {
                console.log('Успешно подписаны на новости!', response.data);
            })
            .catch(error => {
                console.error('Ошибка при подписке на новости:', error);
            });
        }
    },
    components: {
        ButtonAnimated
    }
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
}
.newsletter_content {
    padding-top: 40px;
}
.newsletter_input {
    width: 100%;
    height: 40px;
    border: none;
    border-bottom: solid 2px #787878;
    outline: 0;
    text-align: center;
    margin-bottom: 1rem;
}
.newsletter_title {
    font-size: 30px;
    font-weight: 500;
    color: #1b1b1b;
}
</style>