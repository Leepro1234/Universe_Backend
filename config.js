var dotenv = require('dotenv')
dotenv.config()

const development = {
  operatorsAliases: false,
  db_user: process.env.DB_USER,
  jwt_secret: process.env.JWT_SECRET,
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET,
}

const production = {
  sample: 'hi',
  operatorsAliases: false,
  db_user: process.env.DB_USER,
  jwt_secret: process.env.JWT_SECRET,
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET,
}

const test = {}

module.exports = { development, production, test }
