import type { AccessTokenResponse, AccessTokenResponseError } from '@/types'

export const generate_access_token = async () => {
  const access_token_request = await fetch(
    'https://alice.boustead.getronicssmartspaces.com/auth/realms/Alice/protocol/openid-connect/token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'password',
        username: 'kiosk@alice.boustead.sg',
        password: 'password',
        client_id: 'vms-client',
        client_secret: 'dc312558-304a-4216-aa55-840824f7c95a'
      })
    }
  )

  const access_token_response: AccessTokenResponse & AccessTokenResponseError = await access_token_request.json()
  if (access_token_response.error) throw new Error(access_token_response.error_description)

  return access_token_response.access_token
}
