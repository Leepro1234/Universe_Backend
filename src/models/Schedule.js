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
        gubun: {
          type: DataTypes.STRING(30),
          allowNull: true,
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
        includesTax: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: false,
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

Schedule.associate = function (models) {
  Schedule.hasMany(models.Tbl001, {
    foreignKey: 'scheduleNo',
    sourceKey: 'scheduleNo',
  })
}

module.exports = Schedule
