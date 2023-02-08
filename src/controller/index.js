const { Router } = require('express')
const router = Router()

router.use('/api/users', require('./users'))
module.exports = router
