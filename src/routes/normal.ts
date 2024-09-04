import {Hono} from 'hono'
import normalFn from '../usecase/normal.js'

const app = new Hono()

app.get('/', async (c) => {
  const result = await normalFn(c)
  return c.json({result})
})

export default app