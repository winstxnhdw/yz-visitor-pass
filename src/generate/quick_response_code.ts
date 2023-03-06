import { config } from '@/config'

interface QRResponse {
  status: string
  data: [
    {
      host: [object]
      qr_image: string
      tenant_floor: string
      tenant_name: string
    }
  ]
}

const generate_quick_response_response = async (access_token: string): Promise<QRResponse> => {
  const qr_endpoint = `${
    config.HOST_URL
  }/visitormanagement/services/non_scheduled_visits?off_set=-480&declaration_acceptance=${new Date().toISOString()}`

  const qr_request = await fetch(qr_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({
      visits: [
        {
          about: '',
          company: '',
          email: '',
          first_name: '',
          host: {
            mail: config.HOST_EMAIL
          },
          last_name: '',
          phone: '',
          tenant_floor: '9;Front;NorthTower',
          tenant_id: 'cn=Youzu -Singapore- Pte Ltd,ou=Tenants,cn=Alice,o=Boustead,dc=getronettes,dc=com',
          tenant_name: 'Youzu -Singapore- Pte Ltd',
          type: 'VISITOR_TYPE_VISITOR'
        }
      ]
    })
  })

  return qr_request.json()
}

export const generate_quick_response_code = async (access_token: string): Promise<string> => {
  const response = await generate_quick_response_response(access_token)
  return response.data[0].qr_image
}
