import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);
const pinia = createPinia();

// axios를 글로벌 속성으로 등록
app.config.globalProperties.$axios = axios;

// Pinia와 Router를 사용하도록 앱 설정
app.use(pinia);
app.use(router);

// 애플리케이션 마운트
app.mount('#app');
