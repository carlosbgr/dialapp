<template>
    <div id="app">
        <div>
          <nav class="navbar navbar-dark bg-primary">
            <a href="/" class="navbar-brand">Dialapp HUGCS</a>
            <template v-if="btnVisible === true">
              <div id="btnlogout" class="row mb-8">
                <button @click="logout" class="btn btn-danger"> Cerrar Sesion </button>
              </div>
            </template>
          </nav>
        </div>
        <router-view></router-view>
      </div>
</template>

<script>

import Firebase from 'firebase'

export default {
    data () {
    return {
      btnVisible: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    logout() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    },
    init () {
      if(window.location.pathname === '/'){
        this.btnVsisble = false
      }
    }
  }
}
</script>

<style>

#btnlogout{
  margin-right: 1%;
}

</style>

