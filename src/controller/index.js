const { Router } = require('express')
const router = Router()

router.use('/api/users', require('./users'))
router.use('/api/schedule', require('./schedule'))
router.use('/api/employee', require('./employee'))
router.use('/api/calendar', require('./calendar'))
router.use('/jwt', require('./jwt'))

module.exports = router
