<template>
    <div id="app">
        <div>
          <nav class="navbar navbar-dark bg-primary">
            <a href="/" class="navbar-brand">Dialapp HUGCS</a>
            <!--<template  v-if="btnVolver === true">
              <button class="btn btn-secondary" @click="volverRedirect" >Volver a >> {{ this.volver }}</button>
            </template>-->
            <template v-if="btnCerrar === true">
              <div id="btnlogout" class="row mb-8">
                <!--<button disabled="disabled" class="btn btn-primary">{{  this.facultativo  }}</button>-->
                <button @click="logout" class="btn btn-danger shadow"> Cerrar Sesion </button>
              </div>
            </template>
          </nav>
        </div>
        <router-view></router-view>
      </div>
</template>

<script>
// Import firebase
import Firebase from 'firebase'

export default {
    data () {
    return {
      btnCerrar: true,
      btnVolver: true,
      volver: '',
      facultativo: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    logout () {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
          window.$cookies.remove('facultativo')
          this.btnCerrar = true
          this.btnVolver = true
        })
    },
    init: function() {
      this.facultativo = window.$cookies.get('facultativo')

      if(window.location.toString().indexOf('login') > 0){
        this.btnCerrar = false
        this.btnVolver = false
      }

      if(window.location.toString().indexOf('menu') > 0){
          this.btnVolver = false
        }

      if(window.location.toString().indexOf('mantenimiento/pacientes') > 0 
      || window.location.toString().indexOf('mantenimiento/monitores') > 0
      || window.location.toString().indexOf('mantenimiento/dializadores') > 0
      || window.location.toString().indexOf('mantenimiento/facultativos') > 0){
        this.volver = "Menu"
      }
    },
    volverRedirect() {
      window.location.replace('#/'+this.volver)
      this.btnVolver = false
    }
  }
}

</script>

<style>

#btnlogout{
  margin-right: 1%;
}

</style>

