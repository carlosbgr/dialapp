const express = require('express')
const router = express.Router()

const Monitor = require('../models/monitor')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const monitores = await Monitor.find()
  res.json(monitores)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const monitor = await Monitor.findById(req.params.id, req.body)
  res.json(monitor)
})

// Inserta un item
router.post('/', async (req, res) => {
  const monitor = new Monitor(req.body)
  await monitor.save()
  res.json({
    status: 'Monitor Guardado'
  })
})

// Actualiza el item correspondinte al id
router.put('/:id', async(req, res) => {
  await Monitor.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Monitor Modificado'
  })
})

// Actualiza el campo activo correspondiente al id
router.put('/:id/:estado', async(req, res) => {
  await Monitor.findByIdAndUpdate(req.params.id, { $set: { estado: !req.body.estado} }, req.body)
  res.json({
      status: 'Monitor Modificado'
  })
})

module.exports = router