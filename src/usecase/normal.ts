import {Context} from "hono";

export default async function normalFn(c: Context) {
  return `normalFn ${process.env.APP_ID}`
}