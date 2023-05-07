const { chalk } = require('chalk')
const { Create, Get } = require('../../service/svc_employee')
import { Request, Response } from 'express'
import { EmployeeType } from '../../service/svc_employee'

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
exports.Get = async (req: Request, res: Response) => {
  try {
    const page: number = (req.query.page as string)
      ? parseInt(req.query.page as string)
      : 1
    const pageCount: number = (req.query.pageCount as string)
      ? parseInt(req.query.pageCount as string)
      : 1
    const id: number | undefined = (req.query.id as string)
      ? parseInt(req.query.id as string)
      : undefined

    const q: any = req.query.q ? req.query.q : ''
    const params = { page: page, pageCount: pageCount, id: id }

    let data = await Get(page, pageCount, id)

    if (q) {
      data = data.filter((data: EmployeeType) => {
        return (
          String(data.employeeNo).toLowerCase().includes(q) ||
          data.name.toLowerCase().includes(q) ||
          data.dTel.toLowerCase().includes(q)
        )
      })
    }

    res.statusCode = 200
    res.send({
      status: true,
      resultMessage: 'success',
      data: data,
      params: params,
      allData: data,
      total: data.length,
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.statusCode = 500
      res.send({ status: false, resultMessage: error.message })
    }
  }
}
