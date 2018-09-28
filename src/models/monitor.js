const mongoose = require("mongoose");
const { Schema } = mongoose;

const Monitor = new Schema(
  {
    numeroSerie: { type: String, unique: true, uppercase: true },
    estado: { type: String, enum: ["A", "D", "U"], default:"A" }, // Activado, Desactivado o en Uso
    tipomonitor: { type: String, uppercase: true }, // Referenciando el Modelo TipoMonitor
    tipoMonitoOption: { type: String, uppercase: true},
    sip: String
  },
  { versionKey: false }
);

module.exports = mongoose.model("Monitor", Monitor);
