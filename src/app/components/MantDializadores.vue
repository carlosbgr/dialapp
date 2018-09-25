<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3">
        <button class="form-group btn btn-primary btn-block shadow" @click="volver">Volver al Menu</button>
        <div class="card shadow">
          <div class="card-header">
            <h3>Añadir Dializador</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendDializador">
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="dializador.nombre" placeholder="Nombre">
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
            <h3>Dializadores</h3>
          </div>
          <div class="card-body">
          <b-pagination align="center" :total-rows="this.dializadores.length" v-model="paginaActual" :per-page="itemsPagina"></b-pagination>
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado + Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(d, index) in paginador(dializadores)" :key="index">
                    <td>{{ d.nombre }}</td>
                      <td align="center">
                        <div class="btn-group">
                          <template v-if="d.estado === 'A'">
                            <button title="Activado" disabled @click="changeEstado(d._id)" class="btn btn-success">A</button>
                            <button title="Desactivar" @click="changeEstado(d._id)" class="btn btn-outline-danger">D</button>
                          </template>
                          <template v-if="d.estado === 'D'">
                            <button title="Activar" @click="changeEstado(d._id)" class="btn btn-outline-success">A</button>
                            <button title="Desactivado" disabled @click="changeEstado(d._id)" class="btn btn-danger">D</button>
                          </template>
                        </div>
                        <button title="Editar" @click="editDializador(d._id)" class="btn btn-secondary">E</button>
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

class Dializador {
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
      dializador: new Dializador(),
      dializadores: [],
      edit: false,
      dializadorToEdit: '',
      paginaActual: 1,
      itemsPagina: 8
    };
  },
  created() {
    this.getDializadores()
  },
  methods: {
    getDializadores() {
      fetch("/api/dializadores")
        .then(res => res.json())
        .then(data => {
          this.dializadores = data
        });
    },
    sendDializador(){
      if(this.edit === false) {
        fetch("/api/dializadores", {
        method: "POST",
        body: JSON.stringify(this.dializador),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json)
        .then(data => {
          this.getDializadores();
          toastr.success('Dializador Añadido')
        })
      } else {
        fetch("/api/dializadores/" + this.dializadorToEdit, {
          method: "PUT",
          body: JSON.stringify(this.dializador),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getDializadores()
            this.edit = false
            toastr.success('Dializador Modificado')
          })
      }
      this.dializador = new Dializador()
    },
    changeEstado(id) {
      fetch("/api/dializadores/" + id)
        .then(res => res.json())
        .then(data => {
          fetch("/api/dializadores/" + id + "/" + data.estado, {
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
              toastr.warning('Dializador Desactivado')
            } else {
              if(data.estado === 'D'){
                toastr.success('Dializador Activado')
              }
            }
            this.getDializadores()
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
