const bcrypt = require('bcrypt')
const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const {
  registerUserModel,
  checkEmailModel,
} = require('../model/user')

// const nodemailer = require('nodemailer')
module.exports = {
  registerUser: async (request, response) => {
    try {
      const { email, password, role } = request.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(password, salt)
      const data = {
        email,
        password: encryptPassword,
        role
      }
      const check = await checkEmailModel(email)
      if (check.length > 0) {
        return helper.response(response, 400, 'Email alredy used')
      } else {
        const result = await registerUserModel(data)
        return helper.response(response, 200, 'success', result)
      }
    } catch (error) {
      return helper.response(response, 400, 'bad request', error)
    }
  },
  loginUser: async (request, response) => {
    try {
      const { email, password } = request.body
      const checkDataUser = await checkEmailModel(email)
      if (checkDataUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          password,
          checkDataUser[0].password
        )
        if (checkPassword) {
          const { ID, email, role } = checkDataUser[0]
          const payload = {
            ID,
            email,
            role
          }
          const token = jwt.sign(payload, 'secret', { expiresIn: '3h' })
          const result = { ...payload, token }
          return helper.response(response, 200, 'success login', result)
        } else {
          return helper.response(response, 400, 'wrong password')
        }
      } else {
        return helper.response(response, 400, 'email not registered')
      }
    } catch (error) {
      return helper.response(response, 400, 'bad request', error)
    }
  }
}
