<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3">
        <button class="form-group btn btn-primary btn-block shadow" @click="volver">Volver al Menu</button>
        <div class="card shadow">
          <div class="card-header">
            <h3>Añadir Acceso Vascular</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendAcceso">
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="acceso.nombre" placeholder="Nombre">
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
            <h3>Accesos Vasculares</h3>
          </div>
          <div class="card-body">
          <b-pagination align="center" :total-rows="this.accesos.length" v-model="paginaActual" :per-page="itemsPagina"></b-pagination>
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado + Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(a, index) in paginador(accesos)" :key="index">
                    <td>{{ a.nombre }}</td>
                      <td align="center">
                        <div class="btn-group">
                          <template v-if="a.estado === 'A'">
                            <button title="Activado" disabled @click="changeEstado(a._id)" class="btn btn-success">A</button>
                            <button title="Desactivar" @click="changeEstado(a._id)" class="btn btn-outline-danger">D</button>
                          </template>
                          <template v-if="a.estado === 'D'">
                            <button title="Activar" @click="changeEstado(a._id)" class="btn btn-outline-success">A</button>
                            <button title="Desactivado" disabled @click="changeEstado(a._id)" class="btn btn-danger">D</button>
                          </template>
                        </div>
                        <button title="Editar" @click="editAcceso(a._id)" class="btn btn-secondary">E</button>
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

class Acceso {
  constructor(nombre, estado) {
    this.nombre = nombre
    this.estado = estado
  }
}

export default {
  components: {
    bPagination
  },
  data() {
    return {
      acceso: new Acceso(),
      accesos: [],
      edit: false,
      accesoToEdit: '',
      paginaActual: 1,
      itemsPagina: 8
    };
  },
  created() {
    this.getAccesos()
  },
  methods: {
    getAccesos() {
      fetch("/api/accesosvasculares")
        .then(res => res.json())
        .then(data => {
          this.accesos = data
        });
    },
    sendAcceso(){
      if(this.edit === false) {
        fetch("/api/accesosvasculares", {
        method: "POST",
        body: JSON.stringify(this.acceso),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json)
        .then(data => {
          this.getAccesos();
          toastr.success('Acceso Vascular Añadido')
        })
      } else {
        fetch("/api/accesosvasculares/" + this.accesoToEdit, {
          method: "PUT",
          body: JSON.stringify(this.acceso),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getAccesos()
            this.edit = false
            toastr.success('Acceso Vascular Modificado')
          })
      }
      this.acceso = new Acceso()
    },
    changeEstado(id) {
      fetch("/api/accesosvasculares/" + id)
        .then(res => res.json())
        .then(data => {
          fetch("/api/accesosvasculares/" + id + "/" + data.estado, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(dataStatus => {

            if(data.estado === 'A'){
              toastr.warning('Acceso Vascular Desactivado')
            } else {
              if(data.estado === 'D'){
                toastr.success('Acceso Vascular Activado')
              }
            }
            this.getAccesos()
          })
        })
    },
    editDializador(id) {
      fetch("/api/dializadores/" + id)
        .then(res => res.json())
        .then(data => {
          this.dializador = new Dializador(
            data.nombre,
            data.estado),
            this.dializadorToEdit = data._id,
            this.edit = true
        })
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

.btn-secondary{
  margin-left: 5%;
}

</style>