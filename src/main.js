import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

createApp(App).use(router).mount('#app');
