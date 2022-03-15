<template>
    <nav-component :titel="title"></nav-component>
    <h1>{{ title }}</h1>
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Register'
            }
        },
        mounted() {
            console.log('Register Component mounted.')
        }
    }
</script>