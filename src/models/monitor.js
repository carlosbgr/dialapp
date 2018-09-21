const mongoose = require("mongoose");
const { Schema } = mongoose;

const Monitor = new Schema(
  {
    numeroSerie: { type: String, unique: true },
    estado: { type: String, enum: ["A", "L", "U"] }, // Asignado, Libre o en Uso
    tipoMonitor: { type: Schema.ObjectId, ref: "TipoMonitor" } // Referenciando el Modelo TipoMonitor
  },
  { versionKey: false }
);

module.exports = mongoose.model("Monitor", Monitor);
