//스케쥴 별 운행기사정보
const { Sequelize, DataTypes, Model } = require('sequelize')

class Tbl001 extends Sequelize.Model {
  static initiate(sequelize) {
    Tbl001.init(
      {
        employeeNo: {
          //기사번호
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        scheduleNo: {
          //예약번호
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        driverTel: {
          //기사연락처
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        peopleCount: {
          //인승
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        carNumber: {
          //차량번호
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        dPayMethod: {
          //지급구분
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        dPriceGubun: {
          //금액구분
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        driverPrice: {
          //금액
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        index: {
          //금액
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Tbl001',
        tableName: 'Tbls001',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        indexes: [
          {
            name: 'IDX_DriverAndSchedule',
            fields: ['employeeNo', 'scheduleNo'],
            unique: true,
          },
        ],
      }
    )
  }
}

Tbl001.associate = function (models) {
  Tbl001.belongsTo(models.Employee, {
    foreignKey: 'employeeNo',
    targetKey: 'employeeNo',
  })

  Tbl001.belongsTo(models.Schedule, {
    foreignKey: 'scheduleNo',
    targetKey: 'scheduleNo',
  })
}
module.exports = Tbl001
