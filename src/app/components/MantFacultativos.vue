<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3">
        <button class="form-group btn btn-primary btn-block shadow" @click="volver">Volver al Menu</button>
        <div class="card shadow">
          <div class="card-header">
            <h3>Añadir Facultativo</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendFacultativo">
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="facultativo.nif" placeholder="NIF">
              </div>
               <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="facultativo.numColegiado" placeholder="Num Colegiado">
              </div>
              <div class="form-group">
                <input type="email" class="form-control form-control-sm" v-model="facultativo.email" placeholder="@Correo">
              </div>
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="facultativo.nombre" placeholder="Nombre">
              </div>
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="facultativo.pApellido" placeholder="Primer Apellido">
              </div>
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="facultativo.sApellido" placeholder="Segundo Apellido">
              </div>
              <div class="form-group">
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" id="sexoH" value="H" name="groupSexoRadio">
                  <label class="custom-control-label" for="sexoH">Hombre</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" id="sexoM" value="M" name="groupSexoRadio">
                  <label class="custom-control-label" for="sexoM">Mujer</label>
                </div>
              </div>
              <template v-if="edit === false">
                <button class="btn btn-block btn-primary shadow">Añadir</button>
              </template>
              <template v-else>
                <button class="btn btn-block btn-primary shadow">Modificar</button>
              </template>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card shadow">
          <div class="card-header">
            <h3>Facultativos</h3>
          </div>
          <div class="card-body">
          <b-pagination align="center" :total-rows="this.facultativos.length" v-model="paginaActual" :per-page="itemsPagina"></b-pagination>
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">NIF</th>
                    <th scope="col">N. Colegiado</th>
                    <th scope="col">@email</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(f, index) in paginador(facultativos)" :key="index">
                    <td>{{ f.nif }}</td>
                    <td>{{ f.numColegiado }}</td>
                    <td>{{ f.email }}</td>
                    <td>{{ f.nombre }}</td>

                    <td v-if="f.sApellido === undefined">{{ f.pApellido }}</td>
                    <td v-else>{{ f.pApellido + ' ' + f.sApellido }}</td>
                    <td>
                      <div class="btn-group">
                        <template v-if="f.activo === true">
                          <button @click="unsubscribeFacultativo(f._id)" class="btn btn-danger">D</button>
                        </template>
                        <template v-else>
                          <button @click="unsubscribeFacultativo(f._id)" class="btn btn-success">A</button>
                        </template>
                        <button @click="editFacultativo(f._id)" class="btn btn-secondary">E</button>
                      </div>
                    </td>
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
import moment from 'moment'

import toastr from 'toastr'
toastr.options.timeOut = 2000

import bPagination from "bootstrap-vue/es/components/pagination/pagination";

class Facultativo {
  constructor(nif,numColegiado,email,nombre,pApellido,sApellido) {
    this.nif = nif
    this.numColegiado = numColegiado
    this.email = email
    this.nombre = nombre
    this.pApellido = pApellido
    this.sApellido = sApellido
  }
}

export default {
  components: {
    bPagination
  },
  data() {
    return {
      facultativo: new Facultativo(),
      facultativos: [],
      datatemp: [],
      edit: false,
      facultativoToEdit: '',
      paginaActual: 1,
      itemsPagina: 8
    };
  },
  created() {
    this.getFacultativos()
  },
  methods: {
    getFacultativos() {
      fetch("/api/facultativos")
        .then(res => res.json())
        .then(data => {
          this.facultativos = data
        });
    },
    sendFacultativo(){
      this.facultativo.sexo = this.getSexo()
      if(this.edit === false) {
          Firebase.auth().createUserWithEmailAndPassword(this.facultativo.email, this.facultativo.nif).then(
        (user) => {
            fetch("/api/facultativos", {
        method: "POST",
        body: JSON.stringify(this.facultativo),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json)
        .then(data => {
          this.getFacultativos();
        })
          toastr.success('Facultativo Añadido')
        },
        (err) => {
            toastr.success('Ups! Error al añadir Facultativo')
        })
      } else {
        fetch("/api/facultativos/" + this.facultativoToEdit, {
          method: "PUT",
          body: JSON.stringify(this.facultativo),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getFacultativos()
            this.edit = false
            toastr.success('Facultativo Modificado')
          })
      }
      this.facultativo = new Facultativo()
      this.clearSexo()
    },
    unsubscribeFacultativo(id) {
      fetch("/api/facultativos/" + id)
        .then(res => res.json())
        .then(data => {
          fetch("/api/facultativos/" + id + "/" + data.activo, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(dataStatus => {

            if(data.activo === false){
              toastr.success('Facultativo Activado')
            } else {
              toastr.warning('Facultativo Desactivado')
            }
            this.getFacultativos()
          })
        })
    },
    editFacultativo(id) {
      fetch("/api/facultativos/" + id)
        .then(res => res.json())
        .then(data => {
          this.facultativo = new Facultativo(
            data.nif,
            data.numColegiado,
            data.email,
            data.nombre,
            data.pApellido,
            data.sApellido),
          this.facultativoToEdit = data._id,
          this.edit = true

          this.setSexo(data.sexo)
        })
    },
    getSexo(){
      var sexo;
      if(document.getElementById("sexoH").checked === true){
        sexo = "H"
      } else {
        if(document.getElementById("sexoM").checked === true){
          sexo = "M"
        }
      }

      return sexo
    },
    setSexo(sexo){
      if(sexo === "H"){
            document.getElementById("sexoH").checked = true
            document.getElementById("sexoM").checked = false
          } else {
            document.getElementById("sexoM").checked = true
            document.getElementById("sexoH").checked = false
          }
    },
    clearSexo(){
      document.getElementById("sexoM").checked = false
      document.getElementById("sexoH").checked = false
    },
    paginador(p) {
      const indiceInicio = (this.paginaActual - 1) * this.itemsPagina
      const indiceFinal = indiceInicio + this.paginaActual > p.length ? p.length : indiceInicio  + this.paginaActual
      return p.slice(indiceInicio , (indiceInicio + this.itemsPagina) )
    },
    volver(){
      this.$router.replace('/menu')
    }
  }
}

</script>

<style lang="css" scoped>

</style>
