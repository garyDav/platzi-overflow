// File Deprecated by the db-api
//
// const question = {
//   _id: 1,
//   title: '¿Como reutilizo un componente en Android?',
//   description: 'Miren esta es mi pregunta...',
//   createdAt: new Date(),
//   icon: 'devicon-android-plain',
//   answers: [],
//   user: {
//     firstName: 'Nombre',
//     lastName: 'Apellido',
//     email: 'gary@platzi.com',
//     password: '123456'
//   }
// }
//
// export const questions = new Array(5).fill(question)
//
// export const questionsMiddleware = (req, res, next) => {
//   req.questions = questions
//   next()
// }
//
// export const questionMiddleware = (req, res, next) => {
//   const { id } = req.params
//   req.question = questions.find(({ _id }) => _id === +id)
//   next()
// }

import { question } from '../db-api'
import { handleError } from '../utils'

export const questionMiddleware = async (req, res, next) => {
  try {
    req.question = await question.findById(req.params.id)
    next()
  } catch (err) {
    handleError(err, res)
  }
}
