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
                <input type="number" class="form-control" v-model="paciente.sip" placeholder="SIP">
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
                <input type="number" class="form-control" v-model="paciente.cp" placeholder="Codigo Postal">
              </div>
              <div class="form-group">
                <input type="date" class="form-control" v-model="paciente.fNacimiento" placeholder="Fecha Nacimiento">
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
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">SIP</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Telefonos</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">F. Nacimiento</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(p, index) in pacientes" :key="index">
                    <td>{{ p.sip }}</td>
                    <td>{{ p.nombre }}</td>
                    <td>{{ p.pApellido + ' ' +p.sApellido }}</td>
                    <td>{{ p.telefono + ' - ' +p.otroTelefono }}</td>
                    <td>{{ p.direccion + ', ' + p.cp + '(' + p.localidad + ')'}}</td>
                    <td>{{ p.fNacimiento }}</td>
                    <td>
                      <template v-if="p.activo === true">
                        <button @click="unsubscribePaciente(p._id)" class="btn btn-danger btn-block">D</button>
                      </template>
                      <template v-else>
                        <button @click="unsubscribePaciente(p._id)" class="btn btn-success btn-block">A</button>
                      </template>
                      <button @click="editPaciente(p._id)" class="btn btn-secondary btn-block">E</button>
                    </td>
                </tr>
            </tbody>
          </table>
                    <b-pagination align="center" :total-rows="this.pacientes.length" v-model="currentPage" :per-page="limit"></b-pagination>
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

class Paciente {
  constructor(sip,email,nombre,pApellido,sApellido,telefono,otroTelefono,direccion,localidad,cp,fNacimiento) {
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
  }
}

export default {
  data() {
    return {
      paciente: new Paciente(),
      pacientes: [],
      datatemp: [],
      edit: false,
      pacienteToEdit: '',
      currentPage: 1,
      limit: 2
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
    paginador(pacientes) {
      const indiceInicio = (this.currentpage - 1) * this.limit;
      const indiceFinal =
        indiceInicio + this.currentPage > pacientes.length
          ? pacientes.length
          : indiceInicio  + this.currentPage;
      return pacientes.slice(indiceInicio , indiceFinal );
    }
  }
}
</script>

<style lang="css" scoped>

.container {
  font: 50%;
}

</style>
