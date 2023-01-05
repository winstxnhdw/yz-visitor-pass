import { cleanEnv, str } from 'envalid'
import 'dotenv/config'

export const config = cleanEnv(process.env, {
  HOST_EMAIL: str()
})
