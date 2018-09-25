const mongoose = require("mongoose");
const { Schema } = mongoose;

const Monitor = new Schema(
  {
    numeroSerie: { type: String, unique: true, uppercase: true },
    estado: { type: String, enum: ["A", "D", "U"], default:"A" }, // Activado, Desactivado o en Uso
    tipoMonitor: { type: String, uppercase: true } // Referenciando el Modelo TipoMonitor
  },
  { versionKey: false }
);

module.exports = mongoose.model("Monitor", Monitor);
