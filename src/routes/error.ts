import {Hono} from 'hono'
import errorFn from '../usecase/error.js'

const app = new Hono()

app.get('/', async (c) => {
  const result = await errorFn(c)
  return c.json({result})
})

export default app