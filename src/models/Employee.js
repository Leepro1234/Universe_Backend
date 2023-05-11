const { Sequelize, DataTypes, Model } = require('sequelize')

class Employee extends Sequelize.Model {
  static initiate(sequelize) {
    Employee.init(
      {
        employeeNo: {
          //사번
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          //사원명
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        dTel: {
          //사원연락처
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        startDate: {
          //입사일
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        endDate: {
          //퇴사일
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        bankName: {
          // 은행
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        bankNumber: {
          //계좌번호
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        bankOwner: {
          //예금주
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        employeeAddress: {
          //주소
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        monthPrice: {
          //기준소득월액
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dept: {
          //부서
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        position: {
          //직책
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        tax1: {
          //4대보험여부
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        tax2: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        tax3: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        tax4: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        tax5: {
          type: DataTypes.STRING(10),
          allowNull: true,
        },
        etc: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Employee',
        tableName: 'Employees',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        indexes: [
          {
            name: 'IDX_UNIT',
            fields: ['name', 'dTel'],
            unique: true,
          },
        ],
      }
    )
  }
}
Employee.associate = function (models) {
  Employee.hasMany(models.Tbl001, {
    foreignKey: 'employeeNo',
    sourceKey: 'employeeNo',
  })
}
module.exports = Employee
