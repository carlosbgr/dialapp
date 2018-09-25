const express = require('express')
const router = express.Router()

const Sesion = require('../models/sesion')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const sesiones = await Sesion.find()
  res.json(sesiones)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const sesion = await Sesion.findById(req.params.id, req.body)
  res.json(sesion)
})

// Inserta un item
router.post('/', async (req, res) => {
  const sesion = new Sesion(req.body)
  await sesion.save()
  res.json({
    status: 'Sesion Guardada'
  })
})

// Actualiza el item correspondinte al id
router.put('/:id', async(req, res) => {
  await Sesion.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Sesion Modificada'
  })
})

// Actualiza el campo activo correspondiente al id
router.put('/:id/:activo', async(req, res) => {
  await Sesion.findByIdAndUpdate(req.params.id, { $set: { activo: !req.body.activo} }, req.body)
  res.json({
      status: 'Paciente Modificado'
  })
})

module.exports = router