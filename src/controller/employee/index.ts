import { resourceLimits } from 'worker_threads'

const { Router } = require('express')
const router = Router()
const ctrl = require('./employee.ctrl')
router.get('/ping', ctrl.ping)
router.post('/Create', ctrl.Create)
module.exports = router
