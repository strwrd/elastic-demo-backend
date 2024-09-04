import {Hono} from 'hono'
import apiNextBackendFn from '../usecase/api-next-backend.js'
import slowFn from "../usecase/slow";

const app = new Hono()

app.get('/', async (c) => {
  await slowFn(c)
  const result = await apiNextBackendFn(c)
  return c.json({result})
})

export default app