<template>
    <nav-component :titel="title" :aantalTaken="taken.length"></nav-component>
    
    <!-- TAAK FORMULIER BEGIN -->
    <section>
        <form class="formulier" @submit.prevent="onSubmit">
        <h3>Nieuwe taak</h3>
        <input id="titel" v-model="titel" placeholder="Titel *">
        <textarea id="beschrijving" v-model="beschrijving" placeholder="Beschrijving"></textarea>
    <button class="button"
            :disabled="!okForm"
            :class="{ disabledButton: !okForm }"
            >
            Taak toevoegen
            </button>
        </form>
    </section>
    <!-- TAAK FORMULIER EINDE --> 

    <!-- TAAK LIJST BEGIN -->
    <section>
        <h1>Taken</h1>
        <p v-if="laden" class="boodschap laden">Aan het laden, even geduld ...</p>
        <div v-else>
            <p v-if="taken.length==0" class="boodschap fout">Geen taken gevonden</p>
            <ul v-else>
                <li v-for="(taak, index) in taken" :key="taak.id" 
                    class="formulier"
                    :class="{ taakdone: taak.gedaan }">
                    <table>
                        <tr>
                            <td>
                                <h2 class="taak" :class="{ done: taak.gedaan }" @click="veranderStatus(taak)">
                                    {{ taak.titel }}
                                </h2>
                            </td>
                            <td width="50px">
                                <button class="button buttonX" @click="verwijderTaak(index, taak.id)">X</button>
                            </td>
                        </tr>  
                        <tr>
                            <td colspan="2">
                                <p class="taak"
                                    :class="{ done: taak.gedaan }" 
                                    v-if="taak.beschrijving"
                                    @click="veranderStatus(taak)"
                                    >
                                    <i>{{ taak.beschrijving }}</i>
                                </p>
                            </td>
                        </tr>
                    </table>  
                </li>
            </ul>
        </div>
    </section>
    <!-- TAAK LIJST EINDE -->
    
</template>
<script> 
    export default {
        data() {
            return {
                title: 'Dashboard',
                taken: [],
                errors: [],
                cUser: {},
                token: localStorage.getItem('token'),
                titel: '',
                beschrijving: '',
                laden: true
            }
        },
        methods: {
            async getTasks(userId) {
                this.laden = true;
                await axios.get('/api/tasks/search/'+userId).then(response => {
                    this.taken = response.data;
                });
                this.laden = false;
            }, async onSubmit() {
                const taak = {
                    user_id: this.cUser.id,
                    titel: this.titel.trim(),
                    beschrijving: this.beschrijving.trim() === "" ? null : this.beschrijving.trim(),
                    gedaan: false
                }
                await axios.post('/api/tasks',taak).then(response => {
                    this.getTasks(this.cUser.id);
                    this.titel = ''
                    this.beschrijving = ''
                    document.getElementById("titel").focus()
                });
            }, async veranderStatus(taak) {
                await axios.put('/api/tasks/'+taak.id,{ gedaan: !taak.gedaan}).then(response => {
                    taak.gedaan = !taak.gedaan
                });
            }, async verwijderTaak(index, id) {
                let text = "Bent u zeker dat u deze taak wil verwijderen?";
                if (confirm(text) == true) {
                    await axios.delete('/api/tasks/'+id).then(response => {
                        this.getTasks(this.cUser.id);
                    });
                }
            }
        },
        computed: {
            okForm() {
                return this.titel.trim() !== ''
            }
        },
        mounted() {
            axios.defaults.headers.common['Authorization'] = 'Bearer '+this.token;
            axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.get('/api/user').then(response => {
                this.cUser = response.data;
                this.getTasks(this.cUser.id);
            }).catch((errors) =>{
                this.errors = errors.response.data.errors;
            });
            //console.log('Dashboard Component mounted.')
        }
    }
</script>