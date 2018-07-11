import Debug from 'debug'
import { secret } from '../config'
import jwt from 'jsonwebtoken'

const debug = new Debug('Platzi-overflow:auth')

// Deprecated
// export const users = [
//   {
//     firstName: 'Gary',
//     lastName: 'Guzmán',
//     email: 'gary@platzi.com',
//     password: '123456',
//     _id: 123
//   }
// ]
// export const findUserByEmail = e => users.find(({ email }) => email === e)

export const required = (req, res, next) => {
  jwt.verify(req.query.token, secret, (err, token) => {
    if (err) {
      debug('JWT was not enctrypted with our secret')
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      })
    }

    debug(`Token verified ${token}`)
    req.user = token.user
    next()
  })
}
