const {
  _axios
} = require('wx-jumbo')
const service = _axios.create({
  baseURL: `http://baidu.com`
})

service.interceptors.request.use(config => {
  config.header['Authorization'] = 'aasdf1234567890'
  return config
})

module.exports = service