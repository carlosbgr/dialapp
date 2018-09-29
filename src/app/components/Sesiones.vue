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
              <h3>Registro Monitor</h3>
            </div>
            <div class="card-body">
              <form>
                <div class="form-row">
                  <div class="col">
                    <select class="form-control form-control-sm" id="optionTipoMonitor" @change="getNumerosSerie()" disabled>
                      <option value="" disabled selected id="defaultTipoMonitor">Tipo de Monitor</option>
                      <option v-for="(tm, index) in tipoMonitores" :key="index" v-bind:value="tm.tipo" v-bind:id="tm.tipo">  {{ tm.tipo }} </option>
                    </select>
                  </div>
                  <div class="col">
                    <select id="optionNumeroSerie" class="form-control form-control-sm" disabled>
                      <option value="" disabled selected id="defaultNumSerie">Num Serie</option>
                      <option v-for="(m, index) in monitores" :key="index" v-bind:value="m.numeroSerie" v-bind:id="m.numeroSerie">  {{ m.numeroSerie }} </option>
                    </select>
                  </div>
                  <div class="col">
                    <div class="btn-group">
                      <button id="btnModMonitor" class="btn btn-warning btn-sm shadow" @click="getTiposMonitores()">Modificar</button>
                      <button id="btnSaveMonitor" class="btn btn-success btn-sm shadow" @click="updateMonitor()" disabled>Guardar</button>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="row-md-5">
          <div class="card shadow">
            <div class="card-header">
              <h3>Registro Sesiones</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="setSesion">
                <div class="form-row">
                  <div class="col">
                    <input type="number" min="0" max="4" class="form-control form-control-sm" placeholder="Horas" v-model="sesion.horasSesion" required>
                  </div>
                  <div class="col">
                    <select class="form-control form-control-sm" id="dializador" required>
                      <option value="" disabled selected>Dializador</option>
                      <option v-for="(d, index) in dializadores" :key="index" v-bind:value="d.nombre" v-bind:id="d.nombre">  {{ d.nombre }} </option>
                    </select>
                  </div>
                  <div class="col">
                    <select class="form-control form-control-sm" id="acceso" required>
                      <option value="" disabled selected>Acceso Vascular</option>
                      <option v-for="(a, index) in accesos" :key="index" v-bind:value="a.nombre" v-bind:id="a.nombre">  {{ a.nombre }} </option>
                    </select>
                  </div>
                </div>
                <div class="bg-light border">
                  <div class="form-row">
                    <div class="col bano">
                      <label><strong>Baño</strong></label>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col-4">
                      <select class="form-control form-control-sm" id="tipobano" required>
                        <option value="" disabled selected>Tipo</option>
                        <option value="bolsa">Bolsa</option>
                        <option value="sak">SAK</option>
                        <option value="estandard">Estandard</option>
                      </select>
                    </div>
                    <div class="col-4">
                      <select class="form-control form-control-sm" id="basebano" required>
                        <option value="" disabled selected >Base</option>
                        <option value="Lactato 40">Lactato 40</option>
                        <option value="Lactato 45">Lactato 45</option>
                        <option value="Bicarbonato">Bicabornato</option>
                        <option value="otros">Otros</option>
                      </select>
                    </div>
                    <label class="CAK">Ca</label>
                    <div class="col-1">
                      <select class="form-control form-control-sm" id="ca" required>
                        <option value="" disabled selected>Ca</option>
                        <option value="1.75">1.75</option>
                        <option value="1.5">1.5</option>
                        <option value="1.25">1.25</option>
                      </select>
                    </div>
                    <label class="CAK">K</label>
                    <div class="col-1">
                      <select class="form-control form-control-sm" id="k" required>
                        <option value="" disabled selected>K</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1.5">1.5</option>
                        <option value="1">1</option>
                      </select>
                    </div>
                    <label class="medidas">mL</label>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-2">
                    <input type="text" class="form-control form-control-sm text-center" v-model="sesion.pesoseco" placeholder="Peso Seco" required>
                  </div>
                  <label class="medidas">Kg</label>
                  <div class="col-sm"></div>
                  <div class="col-2">
                    <input type="text" class="form-control form-control-sm" v-model="sesion.ufmax" placeholder="UF Max" required>
                  </div>
                  <label class="medidas">mL</label>
                  <div class="col-sm"></div>
                  <div class="col-2">
                    <input type="text" class="form-control form-control-sm" v-model="sesion.ac" placeholder="Anti-Coagulacion" required>
                  </div>
                  <div class="col-sm"></div>
                  <div class="col-2">
                    <input type="text" class="form-control form-control-sm" v-model="sesion.qd" placeholder="QD" required>
                  </div>
                  <label class="medidas">mL/min</label>
                </div>
                <div class="bg-light border">
                  <div class="form-row">
                    <div class="col-5 bano">
                      <label class="lead">Observaciones</label>
                    </div>
                   <div class="col-2 bano">
                      <label class="lead">Repeticiones</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-5">
                      <textarea  type="text" class="form-control form-control text-center" v-model="sesion.obsfacultativo"></textarea>
                    </div>
                    <div class="col-2">
                      <input type="number" min="0" id="repeticiones" class="form-control form-control text-center repeticiones"  value="0" required>
                    </div>
                    <div class="col">
                    <button class="btn btn-block btn-primary shadow guardar">Guardar</button>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      <div class="row-md-5 ">
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
    this.getPaciente(window.$cookies.get("paciente"));
    this.getMonitor(window.$cookies.get("sip"));

    this.getDializadores();
    this.getAccesos();
  },
  methods: {
    getMonitor(sip) {
      fetch("/api/monitores/sip/" + sip)
        .then(res => res.json())
        .then(data => {
          this.tipoMonitores = data;
          this.monitores = data;
          document.getElementById("optionTipoMonitor").value = 1;
          document.getElementById("optionNumeroSerie").value = 1;
        });
    },
    getTiposMonitores() {
      fetch("/api/tipoMonitores/")
        .then(res => res.json())
        .then(data => {
          this.tipoMonitores = data;
          document.getElementById("optionTipoMonitor").disabled = false;
          document.getElementById("optionTipoMonitor").value = "";
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
          document.getElementById("optionNumeroSerie").disabled = false;

          document.getElementById("btnSaveMonitor").disabled = false;
          document.getElementById("btnModMonitor").disabled = true;
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
              document.getElementById("optionTipoMonitor").disabled = true;
              document.getElementById("optionNumeroSerie").disabled = true;
              document.getElementById("btnSaveMonitor").disabled = true;
            });
        });
    },
    setSesion() {
      this.sesion.sip = this.paciente.sip;
      this.sesion.facultativo = window.$cookies.get("facultativo");
      this.sesion.monitor = document.getElementById("optionTipoMonitor").value;
      this.sesion.numeroSerieMonitor = document.getElementById("optionNumeroSerie").value;
      this.sesion.dializador = document.getElementById("dializador").value;
      this.sesion.accesoVascular = document.getElementById("acceso").value;
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
            data[i].fRegistro = moment(data[i].fRegistro).format("DD/MM/YYYY");
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
          this.getPaciente(window.$cookies.get("paciente"));
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
      const indiceInicio = (this.paginaActual - 1) * this.itemsPagina;
      const indiceFinal =
        indiceInicio + this.paginaActual > p.length
          ? p.length
          : indiceInicio + this.paginaActual;
      return p.slice(indiceInicio, indiceInicio + this.itemsPagina);
    },
    volver() {
      this.$router.replace("/menu");
      window.$cookies.remove("paciente");
    }
  }
};
</script>

<style lang="css" scoped>
.card {
  margin-bottom: 2%;
}

.bano {
  margin-top: 1%;
}

.bg-light {
  padding: 0 1% 1% 1%;
  margin: 2% 0 2% 0;
}

.CAK {
  margin-left: 2%;
  font-weight: bold;
}

.medidas {
  font-size: 80%;
  padding-top: 1%;
}

.pesoseco {
  width: 9%;
  margin-right: 0.8%;
}

.guardar,
.repeticiones {
  height: 100%;
}

.repeticiones {
  font-size: 120%;
  font-weight: bold;
}
</style>
