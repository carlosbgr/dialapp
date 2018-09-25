<template>
    <div class="container">
        <div class="row pt-5">
            <div class="col-md-9">
                <div class="card shadow">
                <div class="card-header">
                    <h3>Pacientes</h3>
                </div>
                <div class="card-body">
                <b-pagination class="pagination-sm" align="center" :total-rows="this.pacientes.length" v-model="paginaActual" :per-page="pacientesPagina"></b-pagination>
                <table class="table table-bordered table-hover small">
                    <thead>
                        <tr>
                            <th scope="col">SIP</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(p, index) in paginador(pacientes)" :key="index">
                            <td><dt>{{ p.sip }}</dt></td>
                            <td>{{ p.nombre }}</td>

                            <td v-if="p.sApellido === undefined">{{ p.pApellido }}</td>
                            <td v-else>{{ p.pApellido + ' ' + p.sApellido }}</td>

                            <td align="center">
                            <div class="btn-group">
                                <button class="btn btn-sm btn-info" @click="btnRedirect('registrosesion')">PAUTAR</button>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow rounded">
                    <div class="card-header">
                        <h3>Mantenimiento</h3>
                    </div>
                    <div class="card-body">
                        <div class="btn-block">
                            <button class="btn btn-light btn-block" @click="btnRedirect('mantenimiento/pacientes')">Pacientes</button>
                            <button class="btn btn-light btn-block" @click="btnRedirect('mantenimiento/monitores')">Monitores</button>
                            <button class="btn btn-light btn-block" @click="btnRedirect('mantenimiento/accesosvasculares')">Accesos Vasculares</button>
                            <button class="btn btn-light btn-block" @click="btnRedirect('mantenimiento/dializadores')">Dializadores</button>
                            <button class="btn btn-light btn-block" @click="btnRedirect('mantenimiento/facultativos')">Facultativos</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import moment from 'moment'

import toastr from 'toastr'
toastr.options.timeOut = 2000

import bPagination from "bootstrap-vue/es/components/pagination/pagination";

class Paciente {
  constructor(sip,email,nombre,pApellido,sApellido,telefono,otroTelefono,direccion,localidad,cp,fNacimiento,sexo) {
    this.sip = sip
    this.email = email
    this.nombre = nombre
    this.pApellido = pApellido
    this.sApellido = sApellido
    this.telefono = telefono
    this.otroTelefono = otroTelefono
    this.direccion = direccion
    this.localidad = localidad
    this.cp = cp
    this.fNacimiento = fNacimiento
    this.sexo
  }
}

export default {
  components: {
    bPagination
  },
  data() {
    return {
      paciente: new Paciente(),
      pacientes: [],
      paginaActual: 1,
      pacientesPagina: 8
    };
  },
  created() {
    this.getPacientes()
  },
  methods: {
    getPacientes() {
      fetch("/api/pacientes")
        .then(res => res.json())
        .then(data => {

          for(var i=0; i < data.length; i++){
            data[i].fNacimiento = moment(data[i].fNacimiento).format('DD/MM/YYYY')
          }

          this.pacientes = data
        });
    },
    paginador(p) {
      const indiceInicio = (this.paginaActual - 1) * this.pacientesPagina
      const indiceFinal = indiceInicio + this.paginaActual > p.length ? p.length : indiceInicio  + this.paginaActual
      return p.slice(indiceInicio , (indiceInicio + this.pacientesPagina) )
    },
    btnRedirect(ruta){
      window.location.replace('#/'+ruta)
      //window.location.reload()
    }
  }
}
</script>

<style lang="css" scoped>

</style>
