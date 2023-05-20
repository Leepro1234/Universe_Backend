const { Sequelize, DataTypes, Model } = require('sequelize')

class Car extends Sequelize.Model {
  static initiate(sequelize) {
    Car.init(
      {
        carNo: {
          //기본키
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        carNumber: {
          //차량번호
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Car',
        tableName: 'Cars',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        indexes: [
          {
            name: 'IDX_UNIT',
            fields: ['carNumber'],
            unique: true,
          },
        ],
      }
    )
  }
}
Car.associate = function (models) {
  Car.hasMany(models.Tbl001, {
    foreignKey: 'carNumber',
    sourceKey: 'carNumber',
  })
}
module.exports = Car
