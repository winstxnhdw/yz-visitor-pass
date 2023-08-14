import { config } from '@/config'

type AccessTokenResponse = AccessTokenResponseSuccess | AccessTokenResponseError

interface AccessTokenResponseSuccess {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  session_state: string
  scope: string
}

interface AccessTokenResponseError {
  error: string
  error_description: string
}

const is_access_token_response = (response: AccessTokenResponse): response is AccessTokenResponseSuccess => {
  return 'access_token' in response
}

const generate_access_token_request = async (): Promise<AccessTokenResponse> => {
  const access_token_request = await fetch(`${config.HOST_URL}/auth/realms/Alice/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'password',
      username: 'kiosk@alice.boustead.sg',
      password: 'password',
      client_id: 'vms-client',
      client_secret: 'dc312558-304a-4216-aa55-840824f7c95a',
    }),
  })

  return access_token_request.json()
}

export const generate_access_token = async (): Promise<string> => {
  const access_token_response = await generate_access_token_request()

  if (!is_access_token_response(access_token_response)) {
    throw new Error(access_token_response.error_description)
  }

  return access_token_response.access_token
}
