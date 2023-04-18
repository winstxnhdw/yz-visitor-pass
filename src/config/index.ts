import 'dotenv/config'
import { cleanEnv, email, url } from 'envalid'
import { env } from 'process'

export const config = cleanEnv(env, {
  HOST_URL: url(),
  HOST_EMAIL: email()
})
