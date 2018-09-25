<template>
<div>
  <div class="container">
    <div class="row mt-5"></div>
    <div class="row mt-5"></div>
    <div class="row mt-5">
      <div class="col-sm-4">
      </div>
      <div class="col-sm-4">
        <div class="card border border-primary shadow rounded">
          <div class="card-header bg-primary">
            <h3 style="color:white">Inicio de Sesion</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="signIn">
              <div class="form-group">
                <input type="text" class="form-control" v-model="email" placeholder="@Correo">
              </div>
              <div class="form-group">
                <input type="password" class="form-control" v-model="password" placeholder="Contraseña">
              </div>
              <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
            <!--<button class="btn btn-link" @click="resetPassword">Retear Contraseña</button>-->
          </div>
        </div>
      </div>
      <div class="col-sm-4">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Firebase from 'firebase'
import App from './App.vue'

export default {
  name: 'signIn',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('menu')
          this.getFacultativosForEmail(this.email)
        },
        (err) => {
          alert('Ups! ' + err.message)
        }
      )
    },
    resetPassword(){
      Firebase.auth()
    },
    getFacultativosForEmail(e) {
      fetch("/api/facultativos/email/" + e)
        .then(res => res.json())
        .then(data => {
          window.$cookies.set('facultativo', data.pApellido + " "
          + data.pApellido + ", "
          + data.nombre + " ("
          + data.nif + ")")
        });
    }
  }
}
</script>
