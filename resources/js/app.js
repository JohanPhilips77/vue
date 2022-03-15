require('./bootstrap');

import { createApp } from 'vue'
import router from './router'
import App from './components/App'
import Nav from './components/Navigation'

const app = createApp({})

app.component('app-component', App)
app.component('nav-component', Nav)

function isLoggedIn() {
    return localStorage.getItem('token')
}

router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    //if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    if (to.meta.requiresAuth && !isLoggedIn()) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/login',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    } else if (to.meta.guest && isLoggedIn()) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        return {
            path: '/dashboard',
            // save the location we were at to come back later
            query: { redirect: to.fullPath },
        }
    }
})

app.use(router).mount('#app')