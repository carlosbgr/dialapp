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
            <div>
              <label>SIP: </label>
              <div>
                <p class="bg-light rounded border text-center"> {{ paciente.sip }} </p>
              </div>
            </div>
            <div>
              <label>Nombre Completo </label>
              <div>
                <p class="bg-light rounded border"> &nbsp;{{ paciente.nombre }} </p>
                <p class="bg-light rounded border"> &nbsp;{{ paciente.pApellido }} {{ paciente.sApellido }} </p>
              </div>
            </div>
            <div>
              <label>Contacto: </label>
              <div>
                <p class="bg-light rounded border text-center"> &nbsp;{{ paciente.email }} </p>
                <p class="bg-light rounded border text-center"> &nbsp;{{ paciente.telefono }} - {{ paciente.otroTelefono }} </p>
              </div>
            </div>
            <div>
              <label>Direccion: </label>
              <div>
                <p class="bg-light rounded border text-center"> &nbsp;&nbsp;{{ paciente.direccion }}&nbsp;&nbsp; </p>
                <p class="bg-light rounded border text-center"> &nbsp;{{ paciente.localidad }} ({{ paciente.cp }}) </p>
              </div>
            </div>
            <div>
              <label>F. Nacimiento: </label>
              <div>
                <p class="bg-light rounded border text-center"> &nbsp;{{ paciente.fNacimiento }} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-9">
        <div class="row-md-5">
          <div class="card shadow">
          <div class="card-header">
            <h3>Sesiones</h3>
          </div>
          <div class="card-body">
            <b-pagination align="center" :total-rows="this.sesiones.length" v-model="paginaActual" :per-page="itemsPagina"></b-pagination>
          <table class="table table-bordered table-hover small">
            <thead>
                <tr>
                    <th scope="col">F Registro</th>
                    <th scope="col">Monitor</th>
                    <th scope="col">Obs Facultativo</th>
                    <th scope="col">Obs Paciente</th>
                    <th scope="col">Estado + Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(s, index) in paginador(sesiones)" :key="index">
                    <td>{{ s.fRegistro }}</td>
                    <td>{{ s.monitor }} ({{ s.numeroSerieMonitor }})</td>
                    <td>{{ s.obsfacultativo }}</td>
                    <td>{{ s.obspaciente }}</td>
                    <td>
                      <template v-if="s.estado === 'R'">
                        <button disabled class="btn btn-outline-success">Registrada</button>
                      </template>
                      <template v-if="s.estado === 'F'">
                        <button disabled class="btn btn-outline-success">Finalizada</button>
                      </template>
                      <template v-if="s.estado === 'C'">
                        <button disabled class="btn btn-outline-success">Confirmada</button>
                      </template>
                      <button class="btn btn-danger" @click="deleteSesion(s._id)">X</button>
                    </td>
                </tr>
            </tbody>
          </table>
         </div>
        </div>
        </div>
        <div class="row-md-5">
        </div>
        <div class="row-md-5 ">
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import toastr from "toastr";
toastr.options.timeOut = 2000;

import bPagination from "bootstrap-vue/es/components/pagination/pagination";

class Sesion {
  constructor(
    sip,
    facultativo,
    monitor,
    numeroSerieMonitor,
    horasSesion,
    dializador,
    accesoVascular,
    tipobano,
    baseBano,
    bano,
    pesoseco,
    ufmax,
    ac,
    qd,
    obsfacultativo
  ) {
    this.sip = sip;
    this.facultativo = facultativo;
    this.monitor = monitor;
    this.numeroSerieMonitor = numeroSerieMonitor;
    this.horasSesion;
    this.dializador, this.accesoVascular, this.tipobano;
    this.basebano;
    this.bano;
    this.pesoseco;
    this.ufmax;
    this.ac;
    this.qd;
    this.obsfacultativo;
  }
}

class Paciente {
  constructor(
    sip,
    email,
    nombre,
    pApellido,
    sApellido,
    telefono,
    otroTelefono,
    direccion,
    localidad,
    cp,
    fNacimiento,
    sexo
  ) {
    this.sip = sip;
    this.email = email;
    this.nombre = nombre;
    this.pApellido = pApellido;
    this.sApellido = sApellido;
    this.telefono = telefono;
    this.otroTelefono = otroTelefono;
    this.direccion = direccion;
    this.localidad = localidad;
    this.cp = cp;
    this.fNacimiento = fNacimiento;
    this.sexo;
  }
}

export default {
  components: {
    bPagination
  },
  data() {
    return {
      sesion: new Sesion(),
      sesiones: [],
      paciente: new Paciente(),
      monitores: [],
      tipoMonitores: [],
      dializadores: [],
      accesos: [],
      paginaActual: 1,
      itemsPagina: 30,
    };
  },
  created() {
    this.getPaciente(window.$cookies.get("paciente"))
    this.getMonitor(window.$cookies.get("sip"))

    this.getDializadores()
    this.getAccesos()
    this.getSesiones()
  },
  methods: {
    getMonitor(sip) {
      fetch("/api/monitores/sip/" + sip)
        .then(res => res.json())
        .then(data => {
          this.tipoMonitores = data;
          this.monitores = data;
          document.getElementById("optionTipoMonitor").value = 1
          document.getElementById("optionNumeroSerie").value = 1
        });
    },
    getTiposMonitores() {
      fetch("/api/tipoMonitores/")
        .then(res => res.json())
        .then(data => {
          this.tipoMonitores = data;
          document.getElementById("optionTipoMonitor").disabled = false
          document.getElementById("optionTipoMonitor").value = ""
        });
    },
    getNumerosSerie() {
      fetch(
        "/api/monitores/numserie/" +
          document.getElementById("optionTipoMonitor").value
      )
        .then(res => res.json())
        .then(data => {
          this.monitores = data;
          document.getElementById("optionNumeroSerie").disabled = false

          document.getElementById("btnSaveMonitor").disabled = false
          document.getElementById("btnModMonitor").disabled = true
        });
    },
    updateMonitor() {
      fetch("/api/monitores/updateMonitorborrar/" + this.paciente.sip, {
        method: "PUT",
        body: JSON.stringify(this.monitores),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          fetch(
            "/api/monitores/updateMonitorinsertar/" +
              document.getElementById("optionNumeroSerie").value +
              "/" +
              this.paciente.sip,
            {
              method: "PUT",
              body: JSON.stringify(this.monitores),
              headers: {
                Accept: "application/json",
                "Content-type": "application/json"
              }
            }
          )
            .then(res => res.json())
            .then(data => {
              this.getMonitor(this.paciente.sip);
              document.getElementById("optionTipoMonitor").disabled = true
              document.getElementById("optionNumeroSerie").disabled = true
              document.getElementById("btnSaveMonitor").disabled = true
            });
        });
    },
    setSesion() {
      this.sesion.sip = this.paciente.sip
      this.sesion.facultativo = window.$cookies.get("facultativo")
      this.sesion.monitor = document.getElementById("optionTipoMonitor").value
      this.sesion.numeroSerieMonitor = document.getElementById("optionNumeroSerie").value
      this.sesion.dializador = document.getElementById("dializador").value
      this.sesion.accesoVascular = document.getElementById("acceso").value
      this.sesion.tipobano = document.getElementById("tipobano").value;
      this.sesion.basebano = document.getElementById("basebano").value;
      this.sesion.bano =
        "Ca " +
        document.getElementById("ca").value +
        " - K " +
        document.getElementById("k").value;

      for (var i = 0; i < document.getElementById("repeticiones").value; i++) {
        fetch("/api/sesiones", {
          method: "POST",
          body: JSON.stringify(this.sesion),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json"
          }
        });
      }
      this.getSesiones(this.paciente.sip)
    },
    getSesiones(sip) {
      fetch("/api/sesiones/sip/" + sip)
        .then(res => res.json())
        .then(data => {
          for (var i = 0; i < data.length; i++) {
            data[i].fRegistro = moment(data[i].fRegistro).format("DD/MM/YYYY")
          }
          this.sesiones = data;
        });
    },
    deleteSesion(id) {
      fetch("/api/sesiones/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          this.getPaciente(window.$cookies.get("paciente"))
        });
    },
    getPaciente(id) {
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
            (data.fNacimiento = moment(data.fNacimiento).format("DD/MM/YYYY")),
            data.sexo
          );

          this.getSesiones(data.sip);
          window.$cookies.set("sip", data.sip);
        });
    },
    getDializadores() {
      fetch("/api/dializadores")
        .then(res => res.json())
        .then(data => {
          this.dializadores = data;
        });
    },
    getAccesos() {
      fetch("/api/accesosvasculares")
        .then(res => res.json())
        .then(data => {
          this.accesos = data;
        });
    },
    paginador(p) {
      const indiceInicio = (this.paginaActual - 1) * this.itemsPagina
      const indiceFinal =
        indiceInicio + this.paginaActual > p.length
          ? p.length
          : indiceInicio + this.paginaActual
      return p.slice(indiceInicio, indiceInicio + this.itemsPagina)
    },
    volver() {
      this.$router.replace("/menu")
      window.$cookies.remove("paciente")
      window.$cookies.remove("sip")
    }
  }
};
</script>

<style lang="css" scoped>

</style>
