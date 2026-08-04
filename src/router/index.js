import { createRouter, createWebHistory } from 'vue-router';
import LandindPage from '../pages/LandindPage.vue';
import Home from '../pages/app/Home.vue';
import PostViewer from '../pages/app/Posts.vue';
import CreatePost from '../pages/app/CreatePost.vue';
import Profile from '../pages/app/Profile.vue';
import ProfileConfig from '../pages/app/ProfileConfig.vue';
import AccountConfig from '../pages/app/AccountConfig.vue';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: LandindPage,
        meta: { requiresGuest: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/post/:id',
        name: 'PostViewer',
        component: PostViewer,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/create',
        name: 'CreatePost',
        component: CreatePost,
        meta: { requiresAuth: true }
    },
    {
        path: '/post/:id/edit',
        name: 'EditPost',
        component: CreatePost,
        props: true,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
    },
    {
        path: '/profile/edit',
        name: 'ProfileEdit',
        component: ProfileConfig,
        meta: { requiresAuth: true }
    },
    {
        path: '/account/edit',
        name: 'AccountEdit',
        component: AccountConfig,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});

// Navigation guard – uses localStorage directly to avoid circular import with the store
router.beforeEach((to) => {
    const token = localStorage.getItem('auth_token');

    if (to.meta.requiresAuth && !token) {
        return { name: 'Landing' };
    }

    if (to.meta.requiresGuest && token) {
        return { name: 'Home' };
    }
});

export default router;
