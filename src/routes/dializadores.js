const express = require('express')
const router = express.Router()

const Dializador = require('../models/dializador')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const dializadores = await Dializador.find()
  res.json(dializadores)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const dializador = await Dializador.findById(req.params.id, req.body)
  res.json(dializador)
})

// Inserta un item
router.post('/', async (req, res) => {
  const dializador = new Dializador(req.body)
  await dializador.save()
  res.json({
    status: 'Dializador Guardado'
  })
})

// Actualiza el item correspondinte al id
router.put('/:id', async(req, res) => {
  await Dializador.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Dializador Modificado'
  })
})

// Actualiza el campo estado correspondiente al id
router.put('/:id/:estado', async(req, res) => {
  var estado;
  if(req.body.estado === 'A'){
    estado = "D"
  } else {
    if(req.body.estado === 'D'){
      estado = "A"
    }
  }
  await Dializador.findByIdAndUpdate(req.params.id, { $set: { estado: estado} }, req.body)
  res.json({
      status: 'Estado de Dializador Modificado'
  })
})

module.exports = router