import {Hono} from 'hono'
import apiNextBackendFn from '../usecase/api-next-backend.js'

const app = new Hono()

app.get('/', async (c) => {
  const result = await apiNextBackendFn(c)
  return c.json({result})
})

export default app