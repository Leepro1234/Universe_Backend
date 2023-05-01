const jwtRouter = require('express')
const jwtrouter = jwtRouter()
const jwtctrl = require('./jwt.ctrl')
jwtrouter.get('/ping', jwtctrl.ping)
jwtrouter.get('/me', jwtctrl.me)
jwtrouter.post('/login', jwtctrl.login)

module.exports = jwtrouter
