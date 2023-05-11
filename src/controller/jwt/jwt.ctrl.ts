const { chalk } = require('chalk')
const svcJwt = require('../../service/svc_jwt')

import { Request, Response } from 'express'

exports.ping = async (req: Request, res: Response) => {
  try {
    res.statusCode = 200
    res.send({ status: true, resultMessage: 'pong2' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}

exports.me = async (req: Request, res: Response) => {
  try {
    const result = await svcJwt.me(req)
    res.statusCode = result[0]
    res.send(result[1])
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}

exports.login = async (req: Request, res: Response) => {
  try {
    const result = await svcJwt.login(req)
    res.statusCode = 200
    res.send(result[1])
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
