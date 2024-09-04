import axios from 'axios'
import {Context} from "hono";

export default async function apiNextBackend(c: Context) {
  if (!process.env.NEXT_BACKEND_HOST) {
    throw new Error("next_backend_host is not defined")
  }

  const result = await axios.get(process.env.NEXT_BACKEND_HOST, {
    headers: {
      'X-Request-Id': c.get('requestId')
    }
  })
  return result.data
}

