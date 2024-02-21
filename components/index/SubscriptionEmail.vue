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
                                <button type="submit" class="newsletter_button trans_200">
                                    <span>Подписаться</span>
                                </button>
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
    }
};
</script>
  
<style scoped>
.newsletter {
    border-top: 0.1px solid #676666;
}
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
}
.newsletter_title {
    font-size: 30px;
    font-weight: 500;
    color: #1b1b1b;
}
.newsletter_button {
    position: relative;
    width: 178px;
    height: 61px;
    border: solid 2px #1b1b1b;
    background: #fff;
    cursor: pointer;
    margin-top: 25px;
    overflow: hidden;
}
.trans_200 {
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -ms-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
}
.newsletter_button span {
    display: block;
    position: relative;
    z-index: 10;
    font-size: 16px;
    font-weight: 600;
    color: #1b1b1b;
    background: 0 0;
    -webkit-transition: all .2s ease;
    -moz-transition: all .2s ease;
    -ms-transition: all .2s ease;
    -o-transition: all .2s ease;
    transition: all .2s ease;
}
.newsletter_button:hover span {
    color: #fff;
}
.newsletter_button::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1b1b1b;
    z-index: 0;
    opacity: 0;
    transform: rotate(45deg);
    transform-origin: bottom right;
    transition: all 0.3s ease;
}

.newsletter_button:hover::after {
    opacity: 1;
    transform: rotate(0deg);
}
</style>