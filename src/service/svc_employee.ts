import sequelize from 'sequelize'

//@ts-check
const Employee = require('../models/Employee')

import chalk from 'chalk'
/**
 *
 */
exports.Create = async (param: EmployeeType) => {
  try {
    await Employee.create({
      name: param.name,
      dTel: param.dTel,
      startDate: param.startDate,
      endDate: param.endDate,
      bankName: param.bnakName,
      bankNumber: param.bankNumber,
      bankOwner: param.bankOwner,
      dept: param.dept,
      employeeAddress: param.employeeAddress,
      monthPrice: param.monthPrice?.replaceAll(',', ''), //콤마제거
      position: param.position,
      tax1: param.tax1,
      tax2: param.tax2,
      tax3: param.tax3,
      tax4: param.tax4,
      tax5: param.tax5,
      etc: param.etc,
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
        throw new Error('이미 등록된 사원정보입니다.')
      else console.log(chalk.red(error.message))
      throw new Error(error.message)
    }
  }
}

//////////////////////////////////////////////////////
/* Types */
//////////////////////////////////////////////////////
type EmployeeType = {
  [key: string]: string | number | boolean | undefined
  name: string //사원명
  dTel: string //사원연락처
  startDate?: string //입사일
  endDate?: string //퇴사일
  bnakName?: string //은행
  bankNumber?: string //계좌번호
  bankOwner?: string //예금주
  dept?: string //부서
  employeeAddress: string //주소
  monthPrice?: string //기준소득월액
  position?: string //직책
  tax1?: string //4대보험제외여부
  tax2?: string //4대보험제외여부
  tax3?: string //4대보험제외여부
  tax4?: string //4대보험제외여부
  tax5?: string //4대보험제외여부
  etc?: string //비고
}
