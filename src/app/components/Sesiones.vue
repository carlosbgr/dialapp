<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3">
        <button class="form-group btn btn-primary btn-block shadow" @click="volver">Volver al Menu</button>
        <div class="card shadow">
          <div class="card-header">
            <h3>Datos Paciente</h3>
          </div>
          <div class="card-body">
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card shadow">
          <div class="card-header">
            <h3>Accesos Vasculares</h3>
          </div>
          <div class="card-body">
         </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        volver(){
        this.$router.replace('/menu')
        }
    }
}
</script>
