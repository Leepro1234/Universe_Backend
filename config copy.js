var dotenv = require('dotenv')
dotenv.config()

const development = {
  operatorsAliases: false,
  db_user: process.env.DB_USER,
}

const production = {}

const test = {}

module.exports = { development, production, test }
