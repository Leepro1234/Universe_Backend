//@ts-check
const axios = require('axios')
const chalk = require('chalk')

class Scraper {
  //@ts-ignore
  axiosInstance = axios.create({})

  /**
   * @type {axios.AxiosProxyConfig}
   */
  proxy = {
    protocol: 'http',
    host: '127.0.0.1',
    port: 8888,
  }
  USE_PROXY = false
  WITH_CREDENTIALS = true
  TOKEN = ''

  HEADERS = {}
  //@ts-ignore
  COOKIE = []

  //@ts-ignore
  Go = async (url, method, data) => {
    try {
      //@ts-ignore
      const response = await this.axiosInstance({
        method: method,
        url: url,
        data: data ? data : undefined,
        proxy: this.USE_PROXY ? this.proxy : undefined,
        withCredentials: this.WITH_CREDENTIALS ? true : false,
        headers: this.HEADERS ? this.HEADERS : undefined,
        maxRedirects: 0,
        //@ts-ignore
        validateStatus: function (status) {
          return status >= 200 && status < 304 //리다이렉트Set-cookie 있는경우 쿠키못가져와서 추가
        },
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Scraper
