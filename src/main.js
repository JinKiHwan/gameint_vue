import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);
const pinia = createPinia();
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// axios를 글로벌 속성으로 등록
app.config.globalProperties.$axios = axios;

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL, // process.env로 접근하여 변수 사용
});

function registerUser(userData) {
    return instance.post('signup', userData); // axios사용시 정의된 baseURL사용
}

export { registerUser };

// Pinia와 Router를 사용하도록 앱 설정
app.use(pinia);
app.use(router);

pinia.use(piniaPluginPersistedstate);

// 애플리케이션 마운트
app.mount('#app');
