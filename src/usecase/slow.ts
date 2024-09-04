import {Context} from "hono";

export default async function slowFn(c: Context) {
  return new Promise((resolve) => {
    const timeout = Math.floor(Math.random() * 1000) + 1000

    setTimeout(() => {
      const result = `slowFn ${process.env.APP_ID}`
      resolve(result)
    }, timeout)
  })
}