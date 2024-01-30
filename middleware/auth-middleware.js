import { VerifyToken } from "#service/user-service.js";
import { ErrorObject } from "./error-middleware.js";

export function auth (req, res, next) {
  try {
    if (!req.headers.authorization) return res.status(400).send({ message: 'Missing Token' })
    const token = req.headers.authorization.split(' ')[1]

    if (!token) return res.status(400).send({ message: 'Missing Token' })

    const data = VerifyToken(token)
    req.user_detail = data
    next()
  } catch (error) {
    next(ErrorObject('JWT_ERROR', error))
  }
}