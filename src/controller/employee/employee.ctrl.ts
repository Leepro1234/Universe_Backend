const { chalk } = require('chalk')
const { Create } = require('../../service/svc_employee')
import { Request, Response } from 'express'

exports.ping = async (req: Request, res: Response) => {
  res.statusCode = 200
  res.send({ status: true, resultMessage: 'pong' })
}

exports.Create = async (req: Request, res: Response) => {
  try {
    await Create(req.body)
    res.statusCode = 200
    res.send({ status: true, resultMessage: 'success' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
