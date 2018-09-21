const mongoose = require("mongoose");
const { Schema } = mongoose;

const Facultativo = new Schema(
  {
    nif: { type: String, unique: true },
    numColegiado: { type: String, unique: true },
    email: { type: String, unique: true },
    nombre: { type: String, uppercase: true },
    pApellido: { type: String, uppercase: true },
    sApellido: { type: String, uppercase: true },
    activo: { type: Boolean, default: true },
    sexo: { type: String, enum: ["H", "M"] }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Facultativo", Facultativo);
