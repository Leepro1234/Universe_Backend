//@ts-check
import sequelize from 'sequelize'
const db = require('../models')

import chalk from 'chalk'
/**
 *
 */
exports.Create = async (param: scheduleType) => {
  const trans = await db.sequelize.transaction()

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

    console.log(chalk.green(JSON.stringify(param)))
    const schedule = await db.Schedule.create(
      {
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
      },
      { transaction: trans }
    ).catch((e: unknown) => {
      if (e instanceof sequelize.ValidationError) {
        throw new Error(JSON.stringify(e.errors))
      }
      if (e instanceof Error) {
        throw new Error(e.message)
      }
    })

    await Promise.all(
      (param.driverInfo || []).map(async (info) => {
        if (!info.driver) return
        const Tbls001 = await db.Tbl001.create(
          {
            employeeNo: info.driver,
            scheduleNo: schedule.scheduleNo,
            driverTel: info.driverTel,
            peopleCount: info.peopleCount,
            carNumber: info.carNumber,
            dPayMethod: info.dPayMethod,
            dPriceGubun: info.dPriceGubun,
            driverPrice: info.driverPrice,
            index: info.index,
          },
          { transaction: trans }
        )
      })
    )

    console.log(chalk.blue(JSON.stringify(schedule)))
    await trans.commit()
  } catch (error: unknown) {
    console.log('is rollback')
    await trans.rollback()
    if (error instanceof Error) {
      if (error.message.includes('Validation'))
        throw new Error('이미 등록된 스케쥴정보입니다.')
      throw new Error(error.message)
    }
  }
}

exports.GetSchedules = async (page: number, pageCount: number, id: number) => {
  try {
    let whereClause = {}
    if (id) {
      whereClause = { scheduleNo: id }
    }
    const data = await db.Schedule.findAll({
      attributes: [
        [sequelize.literal('ROW_NUMBER() OVER (ORDER BY scheduleNo)'), 'id'],
        ...Object.keys(db.Schedule.rawAttributes),
      ],
      include: [
        //모델 관계추가
        {
          model: db.Tbl001,
          attributes: {
            include: Object.keys(db.Tbl001.rawAttributes),
          },
          include: [
            {
              model: db.Employee,
              attributes: ['name'],
            },
          ],
        },
      ],
      where: whereClause,
      raw: false,
    })

    const formattedData = data.map((item: any) => {
      const startDateArr = item.startDate.split(' ')
      const endDateArr = item.endDate.split(' ')
      return {
        ...item.get(), //...item 은 Sequlize인스턴스와 충돌이 발생해 오류발생, 하여 ...item.get()사용
        startDate: {
          date: startDateArr[0] || '',
          hour: startDateArr[1] || '',
          min: startDateArr[2] || '',
        },
        endDate: {
          date: endDateArr[0] || '',
          hour: endDateArr[1] || '',
          min: endDateArr[2] || '',
        },
      }
    })
    console.log(chalk.red(JSON.stringify(formattedData)))
    return formattedData
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(chalk.red(error.message))
      throw Error(error.message)
    }
  }
}

//////////////////////////////////////////////////////
/* Types */
//////////////////////////////////////////////////////

type scheduleType = {
  [key: string]: string | number | boolean | undefined | ScheduleDateType | any
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
  driverInfo?: any[]
}
type ScheduleDateType = {
  date?: string
  hour?: string
  min?: string
}
