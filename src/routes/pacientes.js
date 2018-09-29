const express = require('express')
const router = express.Router()

const Paciente = require('../models/Paciente')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const pacientes = await Paciente.find().sort( { activo : -1, sip: 1 } )
  res.json(pacientes)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const paciente = await Paciente.findById(req.params.id, req.body)
  res.json(paciente)
})

// Inserta un item
router.post('/', async (req, res) => {
  const paciente = new Paciente(req.body)
  await paciente.save()
  console.log(paciente)
  res.json({
    status: 'Paciente Guardado'
  })
})

// Actualiza el item correspondinte al id
router.put('/:id', async(req, res) => {
  await Paciente.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Paciente Modificado'
  })
})

// Actualiza el campo activo correspondiente al id
router.put('/:id/:activo', async(req, res) => {
  await Paciente.findByIdAndUpdate(req.params.id, { $set: { activo: !req.body.activo} }, req.body)
  res.json({
      status: 'Paciente Modificado'
  })
})

module.exports = router