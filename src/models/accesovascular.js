const mongoose = require("mongoose");
const { Schema } = mongoose;

const AccesoVascular = new Schema(
  {
    nombre: { type: String, unique: true, uppercase: true },
    estado: { type: String, enum: ["A", "D"], default: "A" }// Activado o Desactivado
  }, 
  { versionKey: false }
);

module.exports = mongoose.model("AccesoVascular", AccesoVascular);
