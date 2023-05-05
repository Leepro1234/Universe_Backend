const { chalk } = require('chalk')
const { Create, GetSchedules } = require('../../service/svc_schedule')
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

exports.GetSchedules = async (req: Request, res: Response) => {
  const page: number = (req.query.page as string)
    ? parseInt(req.query.page as string)
    : 1
  const pageCount: number = (req.query.pageCount as string)
    ? parseInt(req.query.pageCount as string)
    : 1
  const params = { page: 0, pageCount: 0 }
  params.page = page
  params.pageCount = pageCount
  const data = await GetSchedules(req.query.page, req.query.pageCount)
  res.statusCode = 200
  res.send({
    status: true,
    resultMessage: 'success',
    data: data,
    params: params,
    allData: data,
    total: data.length,
  })
  try {
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
