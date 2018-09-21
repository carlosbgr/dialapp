const express = require('express')
const router = express.Router()

const Facultativo = require('../models/facultativo')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const facultativos = await Facultativo.find()
  res.json(facultativos)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const facultativo = await Facultativo.findById(req.params.id, req.body)
  res.json(facultativo)
})

// Devuelve un item filtrando por email
router.get('/email/:email', async(req, res) => {
  const facultativo = await Facultativo.findOne({email: req.params.email}, req.body)
  res.json(facultativo)
})

// Inserta un item
router.post('/', async (req, res) => {
  const facultativo = new Facultativo(req.body)
  await facultativo.save()
  console.log(facultativo)
  res.json({
    status: 'Facultativo Guardado'
  })
})

// Actualiza el item correspondinte al id
router.put('/:id', async(req, res) => {
  await Facultativo.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Facultativo Modificado'
  })
})

// Actualiza el campo activo correspondiente al id
router.put('/:id/:activo', async(req, res) => {
  await Facultativo.findByIdAndUpdate(req.params.id, { $set: { activo: !req.body.activo} }, req.body)
  res.json({
      status: 'Facultativo Modificado'
  })
})

module.exports = router