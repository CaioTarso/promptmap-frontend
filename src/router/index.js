import { createRouter, createWebHistory } from 'vue-router';
import LandindPage from '../pages/LandindPage.vue';
import Home from '../pages/app/Home.vue';
import PostViewer from '../pages/app/Posts.vue';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: LandindPage
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/post/:id',
        name: 'PostViewer',
        component: PostViewer,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

export default router;
