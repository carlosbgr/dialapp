const mongoose = require("mongoose");
const { Schema } = mongoose;

const Dializador = new Schema(
  {
    nombre: { type: String, unique: true, uppercase: true },
    estado: { type: String, enum: ["A", "D"], default: "A" }// Activado o Desactivado
  }, 
  { versionKey: false }
);

module.exports = mongoose.model("Dializador", Dializador);
