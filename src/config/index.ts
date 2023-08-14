import 'dotenv/config'
import { cleanEnv, email, url } from 'envalid'

export const config = cleanEnv(Bun.env, {
  HOST_URL: url(),
  HOST_EMAIL: email(),
})
