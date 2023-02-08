//@ts-check
const app = require('./app')
const chalk = require('chalk')
const schedule = require('node-schedule')
require('dotenv').config()

const PORT = 11111
const HOST = '0.0.0.0'

app.listen(PORT, HOST, () => {
  console.log(chalk.blue(`The express server is listening at port : ${PORT}`))
})
