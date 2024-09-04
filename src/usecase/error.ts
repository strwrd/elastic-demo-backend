import {Context} from "hono";

export default async function errorFn(c: Context) {
  const result = `errorFn ${process.env.APP_ID}`
  throw new Error(result)
}

