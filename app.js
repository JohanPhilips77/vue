const app = Vue.createApp({
    template: '<h1>Hello {{naam}}</h1>',
    data() {
        return {
            naam: 'Jo'
        }
    }
})

app.mount('#app')