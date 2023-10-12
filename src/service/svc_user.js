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
 *  @property {string} comcd
 */

/** @param  {userModel}  user  */
exports.createUser = async ({ email, password, name, comcd }) => {
  try {
    console.log(password)
    if (!email || email.trim() === '')
      throw new Error('이메일을 입력해주시기 바랍니다.')
    if (!password || password.trim() === '')
      throw new Error('패스워드를 입력해주시기 바랍니다.')
    if (!name || name.trim() === '')
      throw new Error('아룸을 입력해주시기 바랍니다.')
    if (!comcd || comcd.trim() === '') comcd = 'default'

    console.log(comcd)

    let hash = await hashPassword(password, saltRounds)
    let isCompare = await correctPassword(password, hash)
    if (!isCompare) throw new Error('Password를 확인해주시기 바랍니다.')

    await user
      //@ts-ignore
      .create({
        email: email,
        password: hash,
        name: name,
        salt: hash,
        comcd: comcd,
      })
      .catch((e) => {
        console.log(e.message)
        throw new Error(e)
      })
  } catch (error) {
    console.log(`svc_user.56 ${error.message}`)
    if (error.message.includes('cannot be null'))
      throw new Error('필수값이 누락되었습니다. 문의 부탁드립니다.')

    if (error.message.includes('Validation'))
      throw new Error('이미 가입된 계정입니다.')
    else throw new Error(error)
  }
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
                config.production.jwt_secret,
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
  const secret = config.production.jwt_secret || ''

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

const hashPassword = async (password, saltRounds) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}
