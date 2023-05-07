import sequelize from 'sequelize'

//@ts-check
const schedule = require('../models/Schedule')

import chalk from 'chalk'
/**
 *
 */
exports.Create = async (param: scheduleType) => {
  try {
    //날짜,시간 처리
    let startDate =
      param.startDate?.date == undefined ? '' : param.startDate?.date
    if (param.startDate?.hour === undefined) {
      startDate += ' '
    } else {
      startDate += ' ' + param.startDate?.hour
    }

    if (param.startDate?.min === undefined) {
      startDate += ' '
    } else {
      startDate += ' ' + param.startDate?.min
    }

    let endDate = param.endDate?.date == undefined ? '' : param.endDate?.date
    if (param.endDate?.hour == undefined) {
      endDate += ' '
    } else {
      endDate += ' ' + param.endDate?.hour
    }

    if (param.endDate?.min == undefined) {
      endDate += ' '
    } else {
      endDate += ' ' + param.endDate?.min
    }
    await schedule
      .create({
        name: param.name,
        gubun: param.gubun,
        tel: param.tel,
        email: param.email,
        cNo: param.cNo,
        startDate: startDate,
        endDate: endDate,
        driver: param.driver,
        driverTel: param.driverTel,
        carNumber: param.carNumber,
        peopleCount: param.peopleCount,
        content: param.content,
        payMethod: param.payMethod,
        price: param.price,
        tax: param.tax,
        total: param.total,
        dPayMethod: param.dPayMethod,
        carPrice: param.carPrice,
        dTax: param.dTax,
        driverPrice: param.driverPrice,
        etc: param.etc,
      })
      .catch((e: unknown) => {
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
        throw new Error('이미 등록된 스케쥴정보입니다.')
      throw new Error(error.message)
    }
  }
}

exports.GetSchedules = async (page: number, pageCount: number, id: number) => {
  let whereClause = {}
  if (id) {
    whereClause = { scheduleNo: id }
  }
  const data = await schedule.findAll({
    attributes: [
      '*',
      [sequelize.literal('ROW_NUMBER() OVER (ORDER BY scheduleNo)'), 'id'],
    ],
    where: whereClause,
    raw: true,
  })

  const formattedData = data.map((item: any) => {
    const startDateArr = item.startDate.split(' ')
    const endDateArr = item.endDate.split(' ')

    return {
      ...item,
      startDate: {
        date: startDateArr[0],
        hour: startDateArr[1],
        min: startDateArr[2],
      },
      endDate: {
        date: endDateArr[0],
        hour: endDateArr[1],
        min: endDateArr[2],
      },
    }
  })

  console.log(chalk.red(JSON.stringify(formattedData)))
  return formattedData
}

//////////////////////////////////////////////////////
/* Types */
//////////////////////////////////////////////////////

type scheduleType = {
  [key: string]: string | number | boolean | undefined | ScheduleDateType
  name?: string //고객명
  tel?: string //고객연락처
  startDate?: ScheduleDateType //출발날짜
  endDate?: ScheduleDateType //귀행날짜
  email?: string //이메일
  cNo?: string //사업자번호
  driver?: string //기사이름
  driverTel?: string //기사연락처
  carNumber?: string //차량번호
  peopleCount?: string //인승
  content?: string //운행정보
  payMethod?: string //결제수단
  price?: number //공급가
  tax?: number //부가세
  total?: number //합계금액
  dPayMethod?: string //지급수단
  carPrice?: number //대차수당
  dTax?: number //부가세
  driverPrice?: number //일반수당
  etc?: string //비고
}
type ScheduleDateType = {
  date?: string
  hour?: string
  min?: string
}
