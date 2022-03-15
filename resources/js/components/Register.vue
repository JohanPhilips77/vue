<template>
    <nav-component :titel="title"></nav-component>
    <form class="formulier">
        <h3>Registeer een account</h3>
        <!-- NAAM -->
        <div>
            <input placeholder="Naam" type="text" v-model="form.name" autocomplete="name" >
            <p class="fout" v-text="errors.name"></p>
        </div>
        <!-- EMAIL -->
        <div>
            <input placeholder="Email" type="email" v-model="form.email" autocomplete="email">
            <p class="fout" v-text="errors.email"></p>
        </div>
        <!-- WACHTWOORD -->
        <div>
            <input placeholder="Wachtwoord" type="password" v-model="form.password" autocomplete="new-password">
            <p class="fout" v-text="errors.password"></p>
        </div>
        <!-- BEVESTIG WACHTWOORD -->
        <div>
            <input placeholder="Bevestig wachtwoord" type="password" v-model="form.password_confirmation" name="password_confirmation" autocomplete="new-password">
            <p class="fout" v-text="errors.password_confirmation"></p>
        </div>

        <table>
            <tr>
                <td>
                    <button @click.prevent="saveForm" type="submit" class="button">Registeren</button>
                </td><td>
                    <router-link to='/login'>Ik heb al een account</router-link>
                </td>
            </tr>
        </table>
    </form>
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Register',
                form:{
                    name: '',
                    email: '',
                    password:'',
                    password_confirmation:''
                },
                errors: {}
            }
        },
        methods:{
            saveForm(){
                console.log('SaveForm')            
            }
        },
        mounted() {
            console.log('Register Component mounted.')
        }
    }
</script>