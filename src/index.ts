import 'elastic-apm-node/start'
import dotenv from "dotenv"

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import {requestId} from 'hono/request-id'
import {initLogger} from './lib/logger.js';

import loggerMiddleware from './middleware/logger.js'
import errorMiddleware from './middleware/error.js'
import healthz from './routes/healthz.js'
import apiNextBackend from './routes/api-next-backend.js'
import apiNextBackendFlackySuccess from './routes/api-next-backend-flacky-success.js'

import error from './routes/error.js'
import normal from './routes/normal.js'
import slow from './routes/slow.js'
import flackyError from './routes/flacky-error.js'
import flackySuccess from './routes/flacky-success.js'


initLogger(process.env.APP_ID as string)
const app = new Hono()

app.use('*', requestId())
app.use('*', loggerMiddleware)
app.use('*', errorMiddleware)
app.route('/healthz', healthz)
app.route('/api-next-backend', apiNextBackend)
app.route('/api-next-backend-flacky-success', apiNextBackendFlackySuccess)
app.route('/error', error)
app.route('/normal', normal)
app.route('/slow', slow)
app.route('/flacky-error', flackyError)
app.route('/flacky-success', flackySuccess)

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
