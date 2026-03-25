import { createRouter, createWebHistory } from 'vue-router';
import LandindPage from '../pages/LandindPage.vue';
import PostViewer from '../pages/app/PostViewer.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandindPage
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
