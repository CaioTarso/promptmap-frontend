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
    },
    {
        path: '/create',
        name: 'CreatePost',
        component: CreatePost
    },
    {
        path: '/post/:id/edit',
        name: 'EditPost',
        component: CreatePost,
        props: true
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/profile/edit',
        name: 'ProfileEdit',
        component: ProfileConfig
    },
    {
        path: '/account/edit',
        name: 'AccountEdit',
        component: AccountConfig
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
