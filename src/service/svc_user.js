//@ts-check
const user = require('../models/User')
const bcrypt = require('bcrypt')
const chalk = require('chalk')
const saltRounds = 10
const { Op } = require('sequelize')

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
    let isLogin = await user
      //@ts-ignore
      .findOne({
        //@ts-ignore
        where: {
          email: id,
        },
      })
      //@ts-ignore
      .then(async (u) => {
        return await correctPassword(pw, u.password)
          .then((authenticated) => {
            return true
          })
          .catch((e) => {
            throw new Error('Login Faild!' + e)
          })
      })
  } catch (err) {
    //@ts-ignore
    throw new Error(err)
  }
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
