var dotenv = require('dotenv')
dotenv.config()

const development = {
  operatorsAliases: false,
  db_user: process.env.DB_USER,
  jwt_secret: process.env.JWT_SECRET,
}

const production = {}

const test = {}

module.exports = { development, production, test }
