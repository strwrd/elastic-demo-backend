import {Hono} from 'hono'
import slowFn from '../usecase/slow.js'

const app = new Hono()

app.get('/', async (c) => {
  const result = await slowFn(c)
  return c.json({result})
})

export default app