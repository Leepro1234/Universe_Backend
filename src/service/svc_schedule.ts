//@ts-check
const schedule = require('../models/Schedule')
const { chalk } = require('chalk')
const { Op } = require('sequelize')
const config = require('../../config')

/**
 *
 */
exports.Create = async (param: scheduleType) => {
  try {
    let startDate =
      param.startDate?.date == undefined ? '' : param.startDate?.date
    startDate +=
      ' ' + param.startDate?.hour == undefined ? '' : param.startDate?.hour
    startDate +=
      ' ' + param.startDate?.min == undefined ? '' : param.startDate?.min

    let endDate = param.endDate?.date == undefined ? '' : param.endDate?.date
    endDate += ' ' + param.endDate?.hour == undefined ? '' : param.endDate?.hour
    endDate += ' ' + param.endDate?.min == undefined ? '' : param.endDate?.min
    await schedule
      .create({
        name: param.name,
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
        if (e instanceof Error) {
          console.log(e.message)
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
