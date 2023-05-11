//@ts-check

import jwt from 'jsonwebtoken'
// ** Default AuthConfig
const defaultAuthConfig = require('../config/auth')
import { UserDataType } from '../context/types'
const config = require('../../config')

const users: UserDataType[] = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'admin@vuexy.com',
  },
  {
    id: 2,
    role: 'client',
    password: 'client',
    fullName: 'Jane Doe',
    username: 'janedoe',
    email: 'client@vuexy.com',
  },
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: config.production.secret,
  expirationTime: config.production.expirationTime,
  refreshTokenSecret: config.production.refreshTokenSecret,
}

type ResponseType = [number, { [key: string]: any }]

exports.me = async (request: any) => {
  //@ts-ignore
  const token = request.headers.authorization

  let response: ResponseType = [200, {}]

  if (!jwtConfig.secret) {
    response = [401, { error: { error: 'Invalid User', sc: jwtConfig.secret } }]
  }
  jwt.verify(token, jwtConfig.secret as string, (err: any, decoded: any) => {
    if (err) {
      console.log(err)
      // ** If onTokenExpiration === 'logout' then send 401 error
      if (defaultAuthConfig.onTokenExpiration === 'logout') {
        // ** 401 response will logout user from AuthContext file
        response = [401, { error: { error: 'Invalid User' } }]
      } else {
        response = [401, { error: { error: 'Invalid User' } }]
        return response
        // ** If onTokenExpiration === 'refreshToken' then generate the new token
        const oldTokenDecoded = jwt.decode(token, { complete: true })

        // ** Get user id from old token
        // @ts-ignore
        const { id: userId } = oldTokenDecoded.payload

        // ** Get user that matches id in token
        const user = users.find((u) => u.id === userId)

        // ** Sign a new token
        const accessToken = jwt.sign(
          { id: userId },
          jwtConfig.secret as string,
          {
            expiresIn: 1800,
          }
        )

        // ** Set new token in localStorage
        //새로만든놈을 업데이트 해주는 로직이나, 나는 노드로 뺏기때문에 로직 수정 필요함
        //window.localStorage.setItem(
        //  defaultAuthConfig.storageTokenKeyName,
        // accessToken
        //)

        const obj = { userData: { ...user, password: undefined } }

        // ** return 200 with user data
        response = [200, obj]
      }
    } else {
      // ** If token is valid do nothing
      // @ts-ignore
      const userId = decoded.id

      // ** Get user that matches id in token
      const userData = JSON.parse(
        JSON.stringify(users.find((u: UserDataType) => u.id === userId))
      )

      delete userData.password

      // ** return 200 with user data
      response = [200, { userData }]
    }
  })
  return response
}

exports.login = async (request: any) => {
  try {
    //@ts-ignore
    const { email, password } = request.body

    let error = {
      email: ['Something went wrong'],
    }

    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
      const accessToken = await jwt.sign(
        { id: user.id },
        jwtConfig.secret as string,
        {
          expiresIn: '7d',
        }
      )

      const response = {
        accessToken,
        userData: { ...user, password: undefined },
      }

      return [200, response]
    } else {
      error = {
        email: ['email or Password is Invalid'],
      }

      return [400, { error }]
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      error = {
        error: error.message,
      }
      console.log(error)
      return [400, { error }]
    }
  }
}
