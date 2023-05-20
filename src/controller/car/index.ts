const { Router } = require('express')
const router = Router()
const ctrl = require('./car.ctrl')
router.get('/ping', ctrl.ping)
router.post('/Create', ctrl.Create)
router.get('/Get', ctrl.Get)

module.exports = router
