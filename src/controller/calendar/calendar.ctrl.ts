const { chalk } = require('chalk')
const { Create, Get, Update, Delete } = require('../../service/svc_calendar')
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
exports.Update = async (req: Request, res: Response) => {
  try {
    await Update(req.body)
    res.statusCode = 200
    res.send({ status: true, resultMessage: 'success' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
exports.Delete = async (req: Request, res: Response) => {
  try {
    await Delete(req.query.id)
    res.statusCode = 200
    res.send({ status: true, resultMessage: 'success' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
exports.Get = async (req: Request, res: Response) => {
  try {
    let data = await Get()
    console.log({
      data,
    })
    res.statusCode = 200
    res.send(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
