import {MiddlewareHandler} from 'hono'
import {logger} from '../lib/logger.js'

const errorMiddleware: MiddlewareHandler = async (c, next) => {
  await next()
  if (c.error) {
    return c.status(500)
  }
}

export default errorMiddleware