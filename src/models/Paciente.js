const mongoose = require('mongoose')
const { Schema } = mongoose

const Paciente = new Schema({
  sip: { type: String, unique: true },
  email: { type: String, unique: true },
  nombre: { type: String, uppercase: true },
  pApellido: { type: String, uppercase: true },
  sApellido: { type: String, uppercase: true },
  telefono: String,
  otroTelefono: String,
  direccion: { type: String, uppercase: true },
  localidad: { type: String, uppercase: true },
  cp: { type: String, uppercase: true },
  fNacimiento: {type: Date, format: 'DD-MM-YYYY'},
  fAlta: { type: Date, default: Date.now() },
  fBaja: Date,
  activo: { type: Boolean, default: true }
})

module.exports = mongoose.model('Paciente', Paciente)
