const { Router } = require('express')
const multer = require('multer')
const router = Router()
const ctrl = require('./schedule.ctrl')
const upload = multer({ dest: 'uploads/' })
router.get('/ping', ctrl.ping)
router.post('/Create', ctrl.Create)

module.exports = router