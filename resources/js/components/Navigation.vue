<template>
    <nav class="nav-bar">
        <div v-if="titel !== 'Dashboard'">
            <router-link to='/login' class="button buttonLink">Login</router-link> 
            <router-link to='/register' class="button buttonLink">Register</router-link>
        </div>
        <div v-else>
            <a @click="logout" type="submit" class="button buttonLink">Logout</a>
        </div>
    </nav>
</template>
<script>
export default {
    props:['titel'],
    methods: {
        logout() {
            console.log("TODO LOGOUT");
        }
    },
    mounted() {
        console.log('Navigation Component mounted.')
    }
}
</script>