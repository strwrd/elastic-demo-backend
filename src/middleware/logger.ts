import {MiddlewareHandler} from 'hono'
import {logger} from '../lib/logger.js'
import apm from "elastic-apm-node";

const loggerMiddleware: MiddlewareHandler = async (c, next) => {
  const start = process.hrtime.bigint()
  await next()
  const end = process.hrtime.bigint()
  const latency = Number(end - start) / 1000

  const log = {
    time: new Date().toISOString(),
    request_id: c.get('requestId'),
    remote_ip: c.req.header('x-forwarded-for') || c.req.header('remote-addr') || '::1',
    host: c.req.header('host') || '',
    method: c.req.method,
    uri: c.req.url,
    status: c.res.status,
    error: c.error ? c.error.message : '',
    latency: latency,
    latency_human: `${latency / 1000}µs`,
    bytes_in: c.req.header('content-length') || 0,
    bytes_out: c.res.headers.get('content-length') || 0
  }

  if (c.error) {
    apm.captureError(c.error)

    logger.error({
      ...log,
      message: c.error.message,
      stack: c.error.stack,
    })
  } else {
    apm.logger.info(log)

    logger.info(log)
  }
}

export default loggerMiddleware