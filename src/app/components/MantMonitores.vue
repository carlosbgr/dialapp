<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3">
        <button class="form-group btn btn-primary btn-block" @click="volver">Volver al Menu</button>
        <div class="card">
          <div class="card-header">
            <h3>Añadir Monitor</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendMonitor">
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="monitor.numeroSerie" placeholder="Num Serie">
              </div>
              <div class="form-group">
                <input type="text" class="form-control form-control-sm" v-model="monitor.estado" placeholder="Estado">
              </div>
              <div class="form-group">
                <select class="form-control">
                  <div v-for="(tm, index) in tipoMonitores" :key="index">
                    <option>{{ tm.tipo }}</option>
                  </div>
                </select>
              </div>
              <template v-if="edit === false">
                <button class="btn btn-block btn-primary">Añadir</button>
              </template>
              <template v-else>
                <button class="btn btn-block btn-primary">Modificar</button>
              </template>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            <h3>Monitores</h3>
          </div>
          <div class="card-body">
          <b-pagination align="center" :total-rows="this.monitores.length" v-model="paginaActual" :per-page="itemsPagina"></b-pagination>
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">Num. Serie</th>
                    <th scope="col">Tipo Monitor</th>
                    <th scope="col">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(m, index) in paginador(monitores)" :key="index">
                    <td>{{ m.numeroSerie }}</td>
                    <td>{{ m.TipoMonitor }}</td>
                    <td>{{ m.estado }}</td>
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

class Monitor {
  constructor(numeroSerie, estado, TipoMonitor) {
    this.numeroSerie = numeroSerie
    this.estado = estado
    this.TipoMonitor = TipoMonitor
  }
}

class TipoMonitor {
  constructor(tipo) {
    this.tipo = tipo
  }
}

export default {
  components: {
    bPagination
  },
  data() {
    return {
      monitor: new Monitor(),
      monitores: [],
      tipoMonitor: new TipoMonitor(),
      tipoMonitores: [],
      datatemp: [],
      edit: false,
      monitorToEdit: '',
      paginaActual: 1,
      itemsPagina: 8
    };
  },
  created() {
    this.getMonitores()
    this.getTipoMonitores()
  },
  methods: {
    getMonitores() {
      fetch("/api/monitores")
        .then(res => res.json())
        .then(data => {
          this.monitores = data
        });
    },
    getTipoMonitores() {
      fetch("/api/tipoMonitores")
        .then(res => res.json())
        .then(data => {
          this.tipoMonitores = data
          console.log(data)
        });
    },
    sendMonitor(){
      if(this.edit === false) {
        fetch("/api/monitores", {
        method: "POST",
        body: JSON.stringify(this.monitor),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json)
        .then(data => {
          this.getMonitores();
          toastr.success('Monitor Añadido')
        })
      } else {
        fetch("/api/monitores/" + this.MonitorToEdit, {
          method: "PUT",
          body: JSON.stringify(this.monitor),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getMonitores()
            this.edit = false
            toastr.success('Monitor Modificado')
          })
      }
      this.monitor = new Monitor()
    },
    changeEstadoMonitor(id) {
      fetch("/api/monitores/" + id)
        .then(res => res.json())
        .then(data => {
          fetch("/api/monitores/" + id + "/" + data.estado, {
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
              toastr.success('Monitor Activado')
            } else {
              toastr.warning('Facultativo Desactivado')
            }
            this.getMonitores()
          })
        })
    },
    editMonitor(id) {
      fetch("/api/monitores/" + id)
        .then(res => res.json())
        .then(data => {
          this.monitor = new Monitor(
            data.numeroSerie,
            data.estado,
            data.TipoMonitor),
          this.monitorToEdit = data._id,
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

</style>
