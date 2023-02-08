//@ts-check
const express = require('express')
const bodyParser = require('body-parser')
//@ts-ignore
const db = require('./models')

class App {
  constructor() {
    this.app = express()
    var cors = require('cors')
    this.app.use(cors())

    //뷰엔진 셋팅
    this.setViewEngine()

    //db접속
    this.dbConnection()

    //미들웨어 셋팅
    this.setMiddleWare()

    //라우팅
    this.setRoute()

    //정적 디렉토리 추가
    this.setStatic()

    //로컬 변수

    //404 페이지를 찾을 수가 없음

    //에러처리
    this.errorHandler()
  }

  dbConnection() {
    //@ts-ignore
    db.sequelize
      .authenticate()
      .then(() => console.log('Connetion has been establishen successhilly'))
      .then(() => {
        console.log('DB Sync Complete.')
        //@ts-ignore
        //return db.sequelize.sync({ alter: true })
      })
      //@ts-ignore
      .catch((err) => {
        console.error('Unable to Connect to the database:', err)
      })
  }

  setViewEngine() {}
  setMiddleWare() {
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  setStatic() {
    this.app.use('/public', express.static('src/public'))
    this.app.use('/uploads', express.static('uploads'))
  }

  setRoute() {
    this.app.use(require('./controller'))
  }

  errorHandler() {
    //@ts-ignore
    this.app.use((err, req, res, next) => {
      res.statusCode = err.statusCode || 500
      res.send(err.message)
    })
  }
}

module.exports = new App().app
