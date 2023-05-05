const { Sequelize, DataTypes, Model } = require('sequelize')

class Schedule extends Sequelize.Model {
  static initiate(sequelize) {
    Schedule.init(
      {
        scheduleNo: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        tel: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        startDate: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        endDate: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        cNo: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        driver: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        driverTel: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        carNumber: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        peopleCount: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        payMethod: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: '999',
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        tax: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        total: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dPayMethod: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: '999',
        },
        carPrice: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dTax: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        driverPrice: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        etc: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        isComplete: {
          type: DataTypes.STRING(30),
          allowNull: false,
          defaultValue: '20',
        },
        isTalk: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Scehdule',
        tableName: 'Schedules',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        indexes: [
          {
            name: 'IDX_UNIT',
            fields: ['name', 'tel', 'startDate', 'endDate'],
            unique: true,
          },
        ],
      }
    )
  }
}

module.exports = Schedule
