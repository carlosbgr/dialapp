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

// Devuelve un item filtrando por sip
router.get('/sip/:sip', async(req, res) => {
  const sesiones = await Sesion.find({ sip: req.params.sip })
  res.json(sesiones)
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

// Borra item por id
router.delete('/:id', async(req, res) => {
  await Sesion.findByIdAndRemove(req.params.id, req.body)
  res.json({
      status: 'Sesion Borrada'
  })
})

module.exports = router