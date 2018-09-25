const express = require('express')
const router = express.Router()

const tipoMonitor = require('../models/tipoMonitor')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const tipomonitores = await tipoMonitor.find()
  res.json(tipomonitores)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const tipomonitores = await tipoMonitor.findById(req.params.id, req.body)
  res.json(tipomonitores)
})

module.exports = router