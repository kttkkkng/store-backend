import { models } from "#config/database.js";
import jwt from "jsonwebtoken";
import { hashSync, compareSync } from "bcrypt";
import { config } from "dotenv";

config()

const { sign, verify } = jwt

const { user } = models

const REFRESH_TOKEN_EXPIRY_TIME = process.env.REFRESH_TOKEN_EXPIRY_TIME
const ACCESS_TOKEN_EXPIRY_TIME = process.env.ACCESS_TOKEN_EXPIRY_TIME
const TOKEN_SECRET = process.env.TOKEN_SECRET
const SALT_ROUND = parseInt(process.env.SALT_ROUND)

export function HashPassword (password) {
  return hashSync(password, SALT_ROUND)
}

export function ComparePassword (password, hashed) {
  return compareSync(password, hashed)
}

export function AccessToken ({ user_id }) {
  return sign({ user_id }, TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY_TIME })
}

export function RefreshToken ({ user_id }) {
  return sign({ user_id }, TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY_TIME })
}

export function VerifyToken (token) {
  return verify(token, TOKEN_SECRET)
}

export async function Authentication (username, password) {
  const user_detail = await user.findOne({
    attributes: ['user_id', 'nickname', 'refresh_token', 'password'],
    raw: true,
    where: {
      username: username,
    },
  })
  if (!user_detail) return
  if (!ComparePassword(password, user_detail.password)) return

  delete user_detail.password
  return user_detail
}

export function LoginService (user_id, refresh_token) {
  return user.update({
    refresh_token: refresh_token
  }, {
    where: {
      user_id: user_id,
    },
  })
}