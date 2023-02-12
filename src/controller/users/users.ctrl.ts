//@ts-check
const svcUser = require('../../service/svc_user')
const chalk = require('chalk')

//@ts-ignore
exports.createUser = async (req, res) => {
  console.log('Create Users!')
  await svcUser.createUser({
    email: 'test@mail.com',
    password: '1234',
    name: '이대용',
  })
  res.statusCode = 200
  res.send({ statusCode: true, resultMessage: 'User Create Success!' })
}

//@ts-ignore
exports.login = async (req, res) => {
  try {
    console.log(req.body)
    const loginResult = await svcUser.login(req.body.email, req.body.password)
    res.statusCode = 200
    res.send(loginResult)
  } catch (err:any) {
    res.statusCode = 500
    res.send({ status: false, resultMessage: err.message })
  }
}

//@ts-ignore
exports.token = async (req, res) => {
  try {
    console.log(chalk.red('hello!'))
    const { authorization } = req.headers
    if (!authorization) {
      return res.send({
        status: false,
        resultMessage: '로그인해주시기 바랍니다.',
      })
    }
    res.send({ status: true })
  } catch (err:any) {
    res.statusCode = 500

    res.send({ status: false, resultMessage: err.message })
  }
}
