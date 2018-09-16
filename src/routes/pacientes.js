const express = require('express')
const router = express.Router()

const Paciente = require('../models/Paciente')

router.get('/', async(req, res) => {
  const pacientes = await Paciente.find()
  res.json(pacientes)
})

router.get('/:id', async(req, res) => {
  const paciente = await Paciente.findById(req.params.id, req.body)
  res.json(paciente)
})

router.post('/', async (req, res) => {
  const paciente = new Paciente(req.body)
  await paciente.save()
  console.log(paciente)
  res.json({
    status: 'Paciente Guardado'
  })
})

router.put('/:id', async(req, res) => {
  await Paciente.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Paciente Modificado'
  })
})

router.put('/:id/:activo', async(req, res) => {
  await Paciente.findByIdAndUpdate(req.params.id, { $set: { activo: !req.body.activo} }, req.body)
  res.json({
      status: 'Paciente Modificado'
  })
})

module.exports = router