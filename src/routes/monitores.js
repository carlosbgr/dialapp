const express = require('express')
const router = express.Router()

const Monitor = require('../models/monitor')

// Devuelve todos los items
router.get('/', async(req, res) => {
  const monitores = await Monitor.find().sort( { estado : -1, tipo : 1, numeroSerie : 1 } )
  res.json(monitores)
})

router.get('/sip/:sip', async(req, res) => {
  const monitor = await Monitor.find( { sip: req.params.sip }, {numeroSerie:1, tipo:1, _id:0} )
  res.json(monitor)
})

// Devuelve items filtrando por tipoMonitor
router.get('/numserie/:tipo', async(req, res) => {
  const numSerie = await Monitor.find( { tipo: req.params.tipo }, {numeroSerie:1} )
  res.json(numSerie)
})

router.get('/asignacionmonitor/:sip', async(req, res) => {
  const monitor = await Monitor.find( { sip: req.params.sip }, {numeroSerie:1, tipomonitor:1, _id:0} )
  res.json(monitor)
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
router.put('/updateMonitorborrar/:sip', async(req, res) => {
  await Monitor.findOneAndUpdate( {sip : req.params.sip},{ $unset : { sip : "" }, $set : { estado : "A" } })
    res.json({
        status: 'SIP Borrado en Actualizacion'
    })
  })

  // Actualiza el campo activo correspondiente al id
router.put('/updateMonitorinsertar/:numeroSerie/:sip', async(req, res) => {
  await Monitor.findOneAndUpdate( {numeroSerie : req.params.numeroSerie},{ $set : { sip : req.params.sip, estado: "U" } })
    res.json({
        status: 'SIP Insertado en Actualizacion'
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
  await Monitor.findByIdAndUpdate(req.params.id, { $set: { estado: estado} }, req.body)
  res.json({
      status: 'Estado de Monitor Modificado'
  })
})

module.exports = router