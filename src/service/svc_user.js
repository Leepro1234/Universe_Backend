//@ts-check
const user = require('../models/User')
const bcrypt = require('bcrypt')
const chalk = require('chalk')
const saltRounds = 10
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const config = require('../../config')

/** @typedef userModel
 *  @property {string} email
 *  @property {string} password
 *  @property {string} name
 */

/** @param  {userModel} user  */
exports.createUser = async ({ email, password, name }) => {
  console.log(chalk.red(password))
  bcrypt.hash(password, saltRounds, function (err, hash) {
    bcrypt.compare(password, hash, function (err, result) {
      console.log(chalk.green(result))
    })
    //@ts-ignore
    user.create({
      email: email,
      password: hash,
      name: name,
      salt: hash,
    })
  })
}

/**
 * @param {string} id
 * @param  {string} pw
 */
exports.login = async (id, pw) => {
  //@ts-ignore
  try {
    let loginResult = await user
      //@ts-ignore
      .findOne({
        //@ts-ignore
        where: {
          email: id,
        },
      })
      //@ts-ignore
      .then(async (u) => {
        if (u === null) {
          throw new Error('가입된 게정이 아닙니다. 회원가입 후 이용햐주세요.')
        }
        return await correctPassword(pw, u.password)
          .then((authenticated) => {
            console.log(chalk.red(authenticated))
            if (authenticated) {
              const token = jwt.sign(
                { email: id },
                //@ts-ignore
                config.development.jwt_secret,
                {
                  expiresIn: '7d',
                  issuer: 'bigDragon',
                  subject: 'auth',
                  algorithm: 'HS256',
                }
              )
              return {
                status: true,
                resultMessage: '로그인 성공',
                token: token,
              }
            } else {
              return {
                status: false,
                resultMessage: '로그인 실패 - 패스워드를 확인해주세요.',
              }
            }
          })
          .catch((e) => {
            console.log(id, pw)
            throw new Error('Login Faild!' + e)
          })
      })
    return loginResult
  } catch (err) {
    console.log(err)
    //@ts-ignore
    throw new Error(err)
  }
}

/**
 *
 * @param {string} authrization
 */
exports.token = (authrization) => {
  const token = authrization.split(' ')[0] || ''
  const secret = config.development.jwt_secret || ''

  jwt.verify(token, secret, (err, data) => {
    if (err) {
      return { status: false, resultMessage: '로그인 재시도 부탁드립니다.' }
    }
  })
}

/**
 *
 * @param {string} enteredPassword
 * @param {string} originalPassword
 * @returns
 */
const correctPassword = async (enteredPassword, originalPassword) => {
  return new Promise((resolve) => {
    bcrypt.compare(enteredPassword, originalPassword, (err, res) => {
      resolve(res)
    })
  })
}
