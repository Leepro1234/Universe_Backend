//@ts-check
const svcUser = require('../../service/svc_user')
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
    console.log('Login Users!!')
    await svcUser.login('test@mail.com', '1234')
    res.statusCode = 200
    res.send({ statusCode: true, resultMessage: 'User Create Success!' })
  } catch (err) {
    res.statusCode = 500
    //@ts-ignore
    res.send({ statusCode: false, resultMessage: err.message })
  }
}
