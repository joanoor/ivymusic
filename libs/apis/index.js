const service = require('./request')
const {
  inject
} = require('wx-jumbo')


const sendVerficationCode = (phoneNumber) => {
  const url = `/user/sendVerificationCode`
  return service.post(url, {
    "phone_number": phoneNumber
  })
}

module.exports = function () {
  inject('sendVerficationCode', sendVerficationCode)
}