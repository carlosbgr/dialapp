<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-md-3">
        <div class="card">
          <div class="card-header">
            <h3>Añadir Paciente</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="sendPaciente">
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.sip" placeholder="SIP">
              </div>
              <div class="form-group">
                <input type="email" class="form-control" v-model="paciente.email" placeholder="@Correo">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.nombre" placeholder="Nombre">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.pApellido" placeholder="Primer Apellido">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.sApellido" placeholder="Segundo Apellido">
              </div>
              <div class="form-group">
                <input type="tel" class="form-control" v-model="paciente.telefono" placeholder="Telefono">
              </div>
              <div class="form-group">
                <input type="tel" class="form-control" v-model="paciente.otroTelefono" placeholder="Otro Telefono">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.direccion" placeholder="Direccion">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.localidad" placeholder="Localidad">
              </div>
              <div class="form-group">
                <input type="text" class="form-control" v-model="paciente.cp" placeholder="Codigo Postal">
              </div>
              <div class="form-group">
                <input type="date" class="form-control" v-model="paciente.fNacimiento" placeholder="Fecha Nacimiento">
              </div>
              <div class="form-group">
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" v-model="paciente.sexo" id="sexoH" value="H" name="groupSexoRadio">
                  <label class="custom-control-label" for="sexoH">Hombre</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" class="custom-control-input" v-model="paciente.sexo" id="sexoM" value="M" name="groupSexoRadio">
                  <label class="custom-control-label" for="sexoM">Mujer</label>
                </div>
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
            <h3>Pacientes</h3>
          </div>
          <div class="card-body">
          <b-pagination align="center" :total-rows="this.pacientes.length" v-model="paginaActual" :per-page="pacientesPagina"></b-pagination>
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">SIP</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Telefonos</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">F.Nacimiento</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in paginador(pacientes)" :key="index">
                    <td>{{ p.sip }}</td>
                    <td>{{ p.nombre }}</td>

                    <td v-if="p.sApellido === undefined">{{ p.pApellido }}</td>
                    <td v-else>{{ p.pApellido + ' ' + p.sApellido }}</td>

                    <td v-if="p.otroTelefono === undefined">{{ p.telefono }}</td>
                    <td v-else>{{ p.telefono + ' - ' +p.otroTelefono }}</td>

                    <td>{{ p.direccion + ', ' + p.cp + ' (' + p.localidad + ')'}}</td>
                    <td>{{ p.fNacimiento }}</td>
                    <td>
                      <div class="btn-group">
                        <template v-if="p.activo === true">
                          <button @click="unsubscribePaciente(p._id)" class="btn btn-danger">D</button>
                        </template>
                        <template v-else>
                          <button @click="unsubscribePaciente(p._id)" class="btn btn-success">A</button>
                        </template>
                        <button @click="editPaciente(p._id)" class="btn btn-secondary">E</button>
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
      datatemp: [],
      edit: false,
      pacienteToEdit: '',
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
    sendPaciente(){
      console.log(this.paciente.sexo)


      if(this.edit === false) {
        fetch("/api/pacientes", {
        method: "POST",
        body: JSON.stringify(this.paciente),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json)
        .then(data => {
          this.getPacientes();
          toastr.success('Paciente Añadido')
        })
      } else {
        fetch("/api/pacientes/" + this.pacienteToEdit, {
          method: "PUT",
          body: JSON.stringify(this.paciente),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            this.getPacientes()
            this.edit = false
            toastr.success('Paciente Modificado')
          })
      }
      this.paciente = new Paciente()
    },
    unsubscribePaciente(id) {
      fetch("/api/pacientes/" + id)
        .then(res => res.json())
        .then(data => {
          fetch("/api/pacientes/" + id + "/" + data.activo, {
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
              toastr.success('Paciente Activado')
            } else {
              toastr.warning('Paciente Desactivado')
            }
            this.getPacientes()
          })
        })
    },
    editPaciente(id) {
      fetch("/api/pacientes/" + id)
        .then(res => res.json())
        .then(data => {
          this.paciente = new Paciente(
            data.sip, 
            data.email,
            data.nombre,
            data.pApellido,
            data.sApellido,
            data.telefono,
            data.otroTelefono,
            data.direccion,
            data.localidad,
            data.cp,
            data.fnacimiento = moment(data.fNacimiento).format('YYYY-MM-DD')),
          this.pacienteToEdit = data._id,
          this.edit = true
        })
    },
    paginador(p) {
      const indiceInicio = (this.paginaActual - 1) * this.pacientesPagina
      const indiceFinal = indiceInicio + this.paginaActual > p.length ? p.length : indiceInicio  + this.paginaActual
      return p.slice(indiceInicio , (indiceInicio + this.pacientesPagina) )
    }
  }
}
</script>

<style lang="css" scoped>

.container {
  font: 40%;
  margin-right: 1%;
}

</style>
