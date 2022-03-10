<template>
  <!-- NAVIGATIE EN TITEL BEGIN -->
  <nav class="nav-bar">
      <h1>Takenlijst</h1> 
      <div class="kaart">
        <p>Aantal: {{ taken.length }}</p>
      </div>
  </nav>
  <!-- NAVIGATIE EN TITEL EINDE -->

  <!-- TAAK FORMULIER BEGIN -->
  <section>
    <form class="taak-form" @submit.prevent="onSubmit">
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
    <p v-if="taken.length==0" class="geentaken">Geen taken</p>
    <ul v-else>
      <li v-for="(taak, index) in taken" :key="taak.id" 
      class="taak-form"
      :class="{ taakdone: taak.gedaan }">
        <table>
          <tr>
            <td>
              <h2 class="taak" :class="{ done: taak.gedaan }" @click="veranderStatus(taak)">
                {{ taak.titel }}
              </h2>
            </td>
            <td width="50px">
              <button class="button buttonX" @click="verwijderTaak(index)">X</button>
            </td>
          </tr>  
          <tr>
            <td colspan="2">
              <p class="taak"
          :class="{ done: taak.gedaan }" 
          v-if="taak.beschrijving"
          @click="veranderStatus(taak)"
          ><i>{{ taak.beschrijving }}</i></p>
              </td>
            </tr>
        </table>  
      </li>
    </ul>
  </section>
  <!-- TAAK LIJST EINDE -->
</template>

<!------------------------------- SCRIPT --------------------------->
<script>
export default {
  name: 'App',
  data() {
    return {
      teller: 0,
      titel: '',
      beschrijving: '',
      taken: JSON.parse(localStorage.getItem('takenlijst') || '[]')
    }
  },
   methods: {
    onSubmit() {
      const taak = {
        id: this.teller,
        titel: this.titel.trim(),
        beschrijving: this.beschrijving.trim(),
        gedaan: false
      }
      this.taken.push(taak)
      this.bewaarTaken()
      this.teller++
      this.titel = ''
      this.beschrijving = ''
      document.getElementById("titel").focus()
    },
    bewaarTaken() {
      localStorage.setItem('takenlijst', JSON.stringify(this.taken))
    },
    veranderStatus(taak) {
      taak.gedaan = !taak.gedaan
      this.bewaarTaken()
    },
    verwijderTaak(index) {
      let text = "Bent u zeker dat u deze taak wil verwijderen?";
      if (confirm(text) == true) {
        this.taken.splice(index, 1)
        this.bewaarTaken()
      }
    }
  }
  ,
  computed: {
    okForm() {
      return this.titel.trim() !== ''
    },
  }
}
</script>