<template>
    <nav-component :titel="title"></nav-component>
    <form class="formulier">
        <h3>Log in op jouw account</h3>
        <!-- EMAIL -->
        <div>
            <input placeholder="Email" type="email" v-model="form.email" autocomplete="email">
            <p class="text-danger" v-text="errors.email"></p>
        </div>
        <!-- WACHTWOORD -->
        <div>
            <input placeholder="Wachtwoord" type="password" v-model="form.password" name="password" autocomplete="current-password">
            <p class="text-danger" v-text="errors.password"></p>
        </div>
        <!-- KNOP EN LINK -->
        <table>
            <tr>
                <td>
                    <button @click.prevent="loginUser" type="submit" class="button">Inloggen</button>
                </td><td>
                    <router-link to='/register'>Een nieuw account aanmaken</router-link>
                </td>
            </tr>
        </table>
    </form>
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Login',
                form: {
                    email: '',
                    password: ''
                },
                errors: []
            }
        },
        mounted() {
            console.log('Login Component mounted.')
        }
    }
</script>