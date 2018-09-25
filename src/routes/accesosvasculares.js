const express = require('express')
const router = express.Router()

const AccesoVascular = require('../models/accesovascular')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const accesosvasculares = await AccesoVascular.find()
  res.json(accesosvasculares)
})

// Devuelve un item filtrando por id
router.get('/:id', async(req, res) => {
  const accesovascular = await AccesoVascular.findById(req.params.id, req.body)
  res.json(accesovascular)
})

// Inserta un item
router.post('/', async (req, res) => {
  const accesovascular = new AccesoVascular(req.body)
  await accesovascular.save()
  res.json({
    status: 'Acceso Vascular Guardado'
  })
})

// Actualiza el item correspondinte al id
router.put('/:id', async(req, res) => {
  await AccesoVascular.findByIdAndUpdate(req.params.id, req.body)
  res.json({
      status: 'Acceso Vascular Modificado'
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
  await AccesoVascular.findByIdAndUpdate(req.params.id, { $set: { estado: estado} }, req.body)
  res.json({
      status: 'Estado de Acceso Vascular Modificado'
  })
})

module.exports = router