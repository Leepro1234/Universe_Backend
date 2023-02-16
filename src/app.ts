import express, {Express} from 'express';
import bodyParser from 'body-parser'
import cors from  'cors' 

const db = require('./models')

class App {
  app: Express = express();
  constructor() {
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
    db.sequelize
      .authenticate()
      .then(() => console.log('Connetion has been establishen successhilly'))
      .then(() => {
        console.log('DB Sync Complete.')
        return db.sequelize.sync({ alter: true })
      })
      .catch((err:any) => {
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
    this.app.use((err:any, req:any, res:any, next:any) => {
      res.statusCode = err.statusCode || 500
      res.send(err.message)
    })
  }
}

module.exports = new App().app
