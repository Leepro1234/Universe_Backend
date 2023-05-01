const { Router } = require('express')
const router = Router()

router.use('/api/users', require('./users'))
router.use('/api/schedule', require('./schedule'))
router.use('/jwt', require('./jwt'))

module.exports = router
