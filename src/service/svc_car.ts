import sequelize from 'sequelize'

//@ts-check
const Car = require('../models/Car')

import chalk from 'chalk'
/**
 *
 */
exports.Create = async (param: CarType) => {
  try {
    await Car.create({
      carNumber: param.carNumber,
    }).catch((e: unknown) => {
      if (e instanceof sequelize.ValidationError) {
        throw new Error(JSON.stringify(e.errors))
      }

      if (e instanceof Error) {
        throw new Error(e.message)
      }
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('Validation'))
        throw new Error('이미 등록된 차량정보입니다.')
      else console.log(chalk.red(error.message))
      throw new Error(error.message)
    }
  }
}

exports.Get = async (page: number, pageCount: number, id: number) => {
  let whereClause = {}
  if (id) {
    whereClause = { carNo: id }
  }
  const data = await Car.findAll({
    attributes: [
      '*',
      [sequelize.literal('ROW_NUMBER() OVER (ORDER BY carNo)'), 'id'],
    ],
    where: whereClause,
    raw: true,
  })

  return data
}

//////////////////////////////////////////////////////
/* Types */
//////////////////////////////////////////////////////
export type CarType = {
  [key: string]: string | number | boolean | undefined
  carNumber?: string //사원명
  carNo?: number //기본키
}
