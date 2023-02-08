//@ts-check
const user = require('../models/User')

/** @typedef userModel
 *  @property {string} email
 *  @property {string} password
 *  @property {string} name
 */

/** @param  {userModel} user  */
exports.createUser = ({ email, password, name }) => {
  //@ts-ignore
  user.create({
    email: email,
    password: password,
    name: name,
  })
}
