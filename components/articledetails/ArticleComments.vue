<template>
    <h2>Комментарии к статье</h2>
    <Divider />
    <div v-if="props.comments.length >= 1">
        <div v-for="comment in props.comments" :key="comment.id" class="comment">
        <div class="user-info">
          <img v-if="comment.user.image" :src="comment.user.image" alt="User Avatar" class="avatar">
            <div class="flex flex-row">
                <div class="col-6 comment-author"><strong>{{ comment.user.first_name }} {{ comment.user.last_name }}</strong></div>
                <div class="col-6 text-right">{{ formatDateFull(comment.created_at) }}</div>
            </div>
        </div>
        <div class="comment-text">
          <div>{{ comment.text }}</div>
        </div>
      </div>
      <div class="mt-4" v-if="isUserAuthenticated">
        <CommonInterfaceButton buttonText="комментировать" @click="toggleCommentForm" :customStyle="{ width: '100%' }"/>
      </div>
      <div class="mt-4" v-else>
        <CommonInterfaceButton buttonText="авторизоваться для комментирования" @click="openLoginModal" :customStyle="{ width: '100%' }"/>
      </div>
    </div>
    <div v-else>
        <div class="no-comments">
            У этой статьи еще нет комментариев. Оставьте первый!
        </div>
        <div class="mt-4" v-if="isUserAuthenticated">
            <CommonInterfaceButton buttonText="комментировать" @click="toggleCommentForm" :customStyle="{ width: '100%' }"/>
        </div>
        <div class="mt-4" v-else>
            <CommonInterfaceButton buttonText="авторизоваться для комментирования" @click="openLoginModal" :customStyle="{ width: '100%', backgroundColor: 'rgb(240, 240, 240)' }"/>
        </div>
    </div>
    <div v-if="showCommentForm" class="comment-form mt-4">
      <textarea class="w-full comment-input" v-model="newComment" rows="4" placeholder="введите комментарий"></textarea>
      <div class="mt-4">
        <CommonInterfaceButton buttonText="отправить" @click="sendComment" :customStyle="{ width: '100%' }"/>
      </div>
    </div>
    <Message v-if="showSuccessMessage" severity="success">Комментарий успешно отправлен. Ожидается модерация.</Message>
    <Message v-if="showWarningMessage" severity="warn">Ты за меня придурка не держи! Введи какой-нибудь текст!</Message>
    <Message v-if="showErrorMessage" severity="error">Произошла ошибка.</Message>
</template>

<script setup>
import { formatDateFull } from '~/utils/func/formatDate';
import { useAuthStore } from '~/store/useAuthStore';

const config = useRuntimeConfig();
const BASE_API_URL = config.public.apiBase;
const authStore = useAuthStore();
const isUserAuthenticated = computed(() => authStore.isAuthenticated);

const props = defineProps({
    articleId: {
      type: Number,
      required: true,
    },
    comments: {
      type: Object,
      required: true,
    },
});

const showCommentForm = ref(false);
const showSuccessMessage = ref(false);
const showWarningMessage = ref(false);
const showErrorMessage = ref(false);
const newComment = ref('');

const toggleCommentForm = () => {
  showCommentForm.value = !showCommentForm.value;
};
const openLoginModal = () => {
  authStore.setModalState(true);
  const openLoginModalEvent = new CustomEvent('open-login-modal');

  window.dispatchEvent(openLoginModalEvent);
};

const sendComment = () => {
  if (newComment.value.trim() === '') {
    showWarningMessage.value = true;
    setTimeout(() => {
      showWarningMessage.value = false;
    }, 5000);
    return;
  }

  const endpoint = 'reviews/create_comment/';
    if (process.client) {
    (async () => {
        const body = JSON.stringify({ 'text': newComment.value,
                                      'article_id': props.articleId});
        const headers = {
        'Content-Type': 'application/json'
        };
        try {
        const apiResponse = await authRequestHandler(BASE_API_URL, endpoint, 'POST', body, headers);
        if (apiResponse.ok) {
            const responseData = await apiResponse.json();
            console.log('Успешный ответ:', responseData);
            newComment.value = '';
            showCommentForm.value = false;
            showSuccessMessage.value = true;
            setTimeout(() => {
                showSuccessMessage.value = false;
            }, 5000);
        } else {
            console.error('Ошибка при отправке комментария:', apiResponse.statusText);
            showErrorMessage.value = true;
            setTimeout(() => {
                showErrorMessage  .value = false;
            }, 5000)
        }
        } catch (error) {
            console.error('Ошибка при отправке комментария:', error);
            showErrorMessage.value = true;
            setTimeout(() => {
                showErrorMessage.value = false;
            }, 5000)
        }
    })();
    }
};
</script>

<style scoped>
.comment {
    margin-top: 1rem;
    background-color: #f9f9f9;
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.comment-text {
    padding: 0.5rem;
    font-size: 1.2rem;
}
.comment-author {
    font-size: 1.5rem;
}
.no-comments {
    font-size: 1.5rem;
}

.comment-input {
  font-size: 1.2rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.comment-input::placeholder {
  font-size: 2rem;
  color: #999;
  text-align: center;
  align-items: center;
  line-height: 4rem;
}
</style>