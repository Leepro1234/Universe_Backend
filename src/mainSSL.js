const app = require('./app')
const https = require('https')
const fs = require('fs')
const chalk = require('chalk')
require('dotenv').config()
const { sslPath } = process.env
const schedule = require('node-schedule')

var privateKey = fs.readFileSync(`${sslPath}/coin.bigdragon.shop/privkey.pem`)
var certificate = fs.readFileSync(`${sslPath}/coin.bigdragon.shop/cert.pem`)
var ca = fs.readFileSync(`${sslPath}/coin.bigdragon.shop/chain.pem`)
const credentials = { key: privateKey, cert: certificate, ca: ca }
const PORT = 80

app.listen(PORT, () => {
  //@ts-ignore
  console.log(chalk.blue(`The express server is listening at port : ${PORT}`))
})

//@ts-ignore
https
  .createServer(credentials, app, (req, res) => {
    console.log('https Start')
  })
  .listen(443, function () {
    console.log(chalk.blue(`listen 443...`))
  })
