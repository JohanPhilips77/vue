<template>
    <h1>{{ title }}</h1>
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Login'
            }
        },
        mounted() {
            console.log('Login Component mounted.')
        }
    }
</script>