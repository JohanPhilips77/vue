import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: '/',
    component: () =>
        import ('../components/Login.vue'),
    meta: { guest: true }
}, {
    path: '/login',
    name: "Login",
    component: () =>
        import ('../components/Login.vue'),
    meta: { guest: true }
}, {
    path: '/register',
    name: "Register",
    component: () =>
        import ('../components/Register.vue'),
    meta: { guest: true }
}, {
    path: '/dashboard',
    name: "Dashboard",
    component: () =>
        import ('../components/Dashboard.vue'),
    meta: { requiresAuth: true }
}]

export default createRouter({
    mode: history,
    history: createWebHistory(),
    linkActiveClass: 'activeLink',
    routes
})