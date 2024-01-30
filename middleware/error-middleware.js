export function ErrorHandler (error, req, res, next) {
  res
  .status(typeof error?.status === 'number' ? error?.status : 500)
  .send({
    code: error?.code || 'UNKNOWN_ERR',
    message: error?.message || error || 'UNKNOWN_ERR',
  })
}

const error_status_list = Object.freeze({
  UNKNOWN_ERR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 400,
  JWT_EXPIRE: 401,
  FORBIDDEN: 403,
  JWT_ERROR: 400,
})

/**
 * @param {keyof typeof error_status_list} code 
 * @param {*} message 
 */
export function ErrorObject (code, message) {
  return { code: code, status: error_status_list[code], message: message }
}