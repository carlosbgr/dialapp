<template>
  <div class="col mb-5">
    <div id="btnlogout" class="row mb-8">
        <button @click="logout" class="btn btn-outline-danger"> Cerrar Sesion </button>
        <h4>{{ msg }}</h4>
    </div>
    <div class="row mb-2">
      <div class="col-md-6" style="background-color:blue">
        <div class="card">
          <div class="card-header">
            <h3>Pacientes</h3>
          </div>
          <div class="card-body">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>SIP</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-md-6" style="background-color:red">
        <div class="card">
          <div class="card-header">
            <h3>Pacientes</h3>
          </div>
          <div class="card-body">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>SIP</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from 'firebase'

export default {
  name: 'menuFacultativo',
  // email: this.$cookies.get('email'),
  data () {
    return {
      msg: 'Bienvenido a DialApp'
    }
  },
  methods: {
    logout: function () {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    }
  }
}
</script>
