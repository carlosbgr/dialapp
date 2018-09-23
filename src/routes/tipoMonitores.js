const express = require('express')
const router = express.Router()

const TipoMonitor = require('../models/tipoMonitor')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const tipoMonitores = await TipoMonitor.find()
  res.json(tipoMonitores)
})

module.exports = router