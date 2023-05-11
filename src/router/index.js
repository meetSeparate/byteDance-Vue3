import {createRouter, createWebHashHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home/Home.vue')
    },
    {
        path: '/jobs',
        name: 'jobs',
        component: () => import('../views/Jobs/Jobs.vue')
    },
    {
      path: '/jobs/:id',
      name: 'jobDetail',
      component: () => import('../views/JobDetail/JobDetail.vue')
    },
    {
        path: '/staff-stories/:id',
        name: 'staff-stories',
        component: () => import('../views/StaffStories/StaffStories.vue')
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('../views/Products/Products.vue')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('../views/User/User.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

