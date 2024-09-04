import {Hono} from 'hono'
import _ from 'lodash'
import normalFn from '../usecase/normal.js'
import slowFn from "../usecase/slow.js";

const app = new Hono()

app.get('/', async (c) => {
  const fn = _.sample([normalFn, slowFn])

  const result = await fn(c)
  return c.json({result})
})

export default app