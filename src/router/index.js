// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/components/IndexComp.vue';
import SignComp from '@/components/SignComp.vue';
import NotFound from '@/components/NotFound.vue'; // 404 페이지

const routes = [
    //메인
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    //회원가입
    {
        path: '/sign',
        name: 'SignComp',
        component: SignComp,
    },

    //404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
