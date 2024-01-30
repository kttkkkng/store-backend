import { ErrorObject } from "#middleware/error-middleware.js"
import { AccessToken, Authentication, LoginService, RefreshToken, VerifyToken } from "#service/user-service.js"

export async function Login (req, res, next) {
  try {
    const { username, password } = req.body

    if (!username || !password) return next(ErrorObject('BAD_REQUEST', 'invalid username or password'))

    const user = await Authentication(username, password)

    if (!user) return next(ErrorObject('BAD_REQUEST', 'invalid username or password'))

    let refresh_token = user.refresh_token

    if (user.refresh_token) {
      try {
        VerifyToken(user.refresh_token)
      } catch (error) {
        refresh_token = RefreshToken(user)
      }
    } else {
      refresh_token = RefreshToken(user)
    }

    if (!refresh_token) refresh_token = RefreshToken(user)

    if (refresh_token != user.refresh_token) await LoginService(user.user_id, refresh_token)

    res.send({ nickname: user.nickname, access_token: AccessToken(user), refresh_token: refresh_token })
  } catch (error) {
    console.log(error)
    next(error)
  }
}