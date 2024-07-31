// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/components/IndexComp.vue';
import Sign from '@/components/SignComp.vue';
import NotFound from '@/components/NotFound.vue'; // 404 페이지

const routes = [
    //메인
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    //로그인
    {
        path: '/sign',
        name: 'sign',
        component: Sign,
    },

    //404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
