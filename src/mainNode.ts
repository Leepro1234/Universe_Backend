//@ts-check
const app = require('./app')
const chalk = require('chalk')
const schedule = require('node-schedule')
require('dotenv').config()

//const PORT = 30001
const PORT = 3000
//const HOST = '0.0.0.0'

app.listen(PORT, () => {
  console.log(chalk.blue(`The express server is listening at port : ${PORT}`))
})

export {}
