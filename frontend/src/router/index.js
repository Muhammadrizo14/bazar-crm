import {createRouter, createWebHashHistory} from 'vue-router';
import Login from "@/components/auth/Login";
import authMiddleware from "@/router/middleware/auth";
import guestMiddleware from "@/router/middleware/guest";
import store from "../store";
import middlewarePipeline from "@/router/middlewarePipeline";
import App from '@/App.vue';
import User from "@/components/admin/user/Index"
import UserCard from "@/components/admin/user/UserCard"
import AdminIndex from "@/components/admin/Index"
import AdminMain from "@/components/admin/main/Index"
import Access from "@/pages/Access"
import NotFound from "@/pages/NotFound"
import adminMiddleware from "./middleware/admin";
import MainReport from "@/components/admin/report/MainReport"


const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {middleware: [guestMiddleware]}
    },
    {
        path: '/',
        name: '/',
        component: App,
        meta: {middleware: [authMiddleware]}
    },
    {
        path: '/access',
        name: 'Access',
        component: Access
    },
    {
        path: '/admin',
        name: 'AdminIndex',
        component: AdminIndex,
        meta: {middleware: [adminMiddleware]},
        children: [
            {
                path: 'main',
                name: 'AdminMain',
                component: AdminMain,
                meta: {middleware: [adminMiddleware]}
            },
            {
                path: 'users',
                name: 'User',
                component: User,
                meta: {middleware: [adminMiddleware]}
            },
            {
                path: 'users/:id',
                name: 'UserCard',
                component: UserCard,
                meta: {middleware: [adminMiddleware]}
            },
            {
                path: 'reports/main',
                name: 'MainReport',
                component: MainReport,
                meta: {middleware: [adminMiddleware]}
            },
        ]
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
    }, {
        path: "/:catchAll(.*)",
        redirect: '/404'
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router;
