//@ts-check
const svcUser = require('../../service/svc_user')
//@ts-ignore
exports.createUser = (req, res) => {
  console.log('Create Users!')
  svcUser.createUser({
    email: 'test@mail.com',
    password: '1234',
    name: '이대용',
  })
  res.statusCode = 200
  res.send({ statusCode: true, resultMessage: 'User Create Success!' })
}
