<template>
<div>
  <div class="container">
    <div class="row mt-5"></div>
    <div class="row mt-5"></div>
    <div class="row mt-5">
      <div class="col-sm-4">
      </div>
      <div class="col-sm-4">
        <div class="card">
          <div class="card-header">
            <h3>Login</h3>
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
              <router-link to="/sign-up">Crear Usuario</router-link>
            </form>
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
          this.$router.replace('pacientes/insertar')
        },
        (err) => {
          alert('Ups! ' + err.message)
        }
      )
    }
  }
}
</script>
