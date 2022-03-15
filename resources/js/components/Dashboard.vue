<template>
    <nav-component :titel="title"></nav-component>
    <h1>{{ title }}</h1>
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Dashboard'
            }
        },
        mounted() {
            console.log('Dashboard Component mounted.')
        }
    }
</script>