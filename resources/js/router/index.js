import { createRouter, createWebHistory } from "vue-router";

const routes = [{
    path: '/',
    component: () =>
        import ('../components/Login.vue'),

}]

export default createRouter({
    mode: history,
    history: createWebHistory(),
    routes
})