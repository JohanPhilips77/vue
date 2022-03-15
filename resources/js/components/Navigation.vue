<template>
    <nav class="nav-bar">
        <div v-if="titel !== 'Dashboard'">
            <router-link to='/login' class="button buttonLink">Aanmelden</router-link> 
            <router-link to='/register' class="button buttonLink">Registeren</router-link>
        </div>
        <div v-else>
            <a @click="logout" type="submit" class="button buttonLink">Afmelden</a>
        </div>
    </nav>
</template>
<script>
export default {
    props:['titel'],
    data() {
        return {
            errors: {}
        }
    },
    methods: {
        async logout() {
            await axios.get('/api/logout').then(response => {
                console.log(response);
                localStorage.removeItem('token')
                this.$router.push('/login'); 
            }).catch((errors) =>{
                this.errors = errors.response.data.errors;
                console.log(errors.response.data.errors);
            });
        }
    },
    mounted() {
        console.log('Navigation Component mounted.')
    }
}
</script>