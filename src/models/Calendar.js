const { Sequelize, DataTypes, Model } = require('sequelize')

class Calendar extends Sequelize.Model {
  static initiate(sequelize) {
    Calendar.init(
      {
        id: {
          //캘린더번호
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        url: {
          //url
          type: DataTypes.STRING(300),
          allowNull: true,
        },
        title: {
          //캘린더제목
          type: DataTypes.STRING(30),
          allowNull: false,
        },
        allDay: {
          //하루종일여부
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        end: {
          //종료일
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        start: {
          //시작일
          type: DataTypes.STRING(50),
          allowNull: true,
        },
        location: {
          //위치?
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        calendar: {
          //색구분
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        guests: {
          //게스트
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        description: {
          //게스트
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Calendar',
        tableName: 'Calendars',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    )
  }
}

module.exports = Calendar
