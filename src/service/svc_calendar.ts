import sequelize from 'sequelize'

//@ts-check
const Calendar = require('../models/Calendar')

import chalk from 'chalk'
/**
 *
 */
exports.Create = async (param: AddEventType) => {
  try {
    console.log(param)
    await Calendar.create({
      url: param.data.event.url,
      title: param.data.event.title,
      allDay: param.data.event.allDay,
      end: param.data.event.end,
      start: param.data.event.start,
      calendar: param.data.event.extendedProps.calendar,
      guests: param.data.event.extendedProps.guests,
      description: param.data.event.extendedProps.description,
    }).catch((e: unknown) => {
      if (e instanceof sequelize.ValidationError) {
        throw new Error(JSON.stringify(e.errors))
      }

      if (e instanceof Error) {
        throw new Error(e.message)
      }
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('Validation'))
        throw new Error('이미 등록된 사원정보입니다.')
      else console.log(chalk.red(error.message))
      throw new Error(error.message)
    }
  }
}

exports.Update = async (param: AddEventType) => {
  try {
    console.log(param)
    await Calendar.update(
      {
        url: param.data.event.url,
        title: param.data.event.title,
        allDay: param.data.event.allDay,
        end: param.data.event.end,
        start: param.data.event.start,
        calendar: param.data.event.extendedProps.calendar,
        guests: param.data.event.extendedProps.guests,
        description: param.data.event.extendedProps.description,
      },
      { where: { id: param.data.event.id } }
    ).catch((e: unknown) => {
      if (e instanceof sequelize.ValidationError) {
        throw new Error(JSON.stringify(e.errors))
      }

      if (e instanceof Error) {
        throw new Error(e.message)
      }
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('Validation'))
        throw new Error('이미 등록된 사원정보입니다.')
      else console.log(chalk.red(error.message))
      throw new Error(error.message)
    }
  }
}

exports.Delete = async (id: string) => {
  try {
    await Calendar.destroy({ where: { id } }).catch((e: unknown) => {
      if (e instanceof sequelize.ValidationError) {
        throw new Error(JSON.stringify(e.errors))
      }

      if (e instanceof Error) {
        throw new Error(e.message)
      }
    })
    return
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(chalk.red(error.message))
      throw new Error(error.message)
    }
  }
}

exports.Get = async () => {
  try {
    let whereClause = {}

    const data = await Calendar.findAll({
      attributes: ['*'],
      //where: whereClause,
      raw: true,
    })

    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error)
    }
  }
}

//////////////////////////////////////////////////////
/* Types */
//////////////////////////////////////////////////////
export type AddEventType = {
  data: {
    event: {
      id?: number
      url: string
      title: string
      display: string
      allDay: boolean
      end: Date | string
      start: Date | string
      extendedProps: {
        calendar?: string
        description?: string | undefined
        guests?: string[] | string | undefined
        location?: string
      }
    }
  }
}
