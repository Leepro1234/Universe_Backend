const { Router } = require('express')
const multer = require('multer')
const router = Router()
const ctrl = require('./users.ctrl')
const upload = multer({ dest: 'uploads/' })
router.post('/createUser', ctrl.createUser)
router.post('/login', ctrl.login)
router.get('/token', ctrl.token)

module.exports = router
