const { Sequelize, DataTypes, Model } = require('sequelize')

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        email: {
          type: DataTypes.STRING(55),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        salt: {
          type: DataTypes.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'Users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        indexes: [
          {
            name: 'IDX_UNIT',
            fields: ['email'],
            unique: true,
          },
        ],
      }
    )
  }
}

module.exports = User
