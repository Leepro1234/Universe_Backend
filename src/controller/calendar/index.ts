import { resourceLimits } from 'worker_threads'

const { Router } = require('express')
const router = Router()
const ctrl = require('./calendar.ctrl')
router.get('/ping', ctrl.ping)
router.post('/Create', ctrl.Create)
router.post('/Update', ctrl.Update)
router.delete('/Delete', ctrl.Delete)
router.get('/Get', ctrl.Get)

module.exports = router
