require('./bootstrap');

import { createApp } from 'vue'
import router from './router'
import App from './components/App'
import Nav from './components/Navigation'

const app = createApp({})

app.component('app-component', App)
app.component('nav-component', Nav)

app.use(router).mount('#app')