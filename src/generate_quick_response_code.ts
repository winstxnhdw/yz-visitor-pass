import { config } from '@/config'
import type { QRResponse } from '@/types/index'

export const generate_quick_response_code = async (access_token: string) => {
  const qr_endpoint = `https://alice.boustead.getronicssmartspaces.com/visitormanagement/services/non_scheduled_visits?off_set=-480&declaration_acceptance=${new Date().toISOString()}`

  const qr_request = await fetch(qr_endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${access_token}`
    },
    body: JSON.stringify({
      visits: [
        {
          about: 'Work',
          company: 'Yoozoo',
          email: 'admin@yoozoo.com',
          first_name: 'admin',
          host: {
            mail: config.HOST_EMAIL
          },
          last_name: 'admin',
          phone: '12345678',
          tenant_floor: '9;Front;NorthTower',
          tenant_id: 'cn=Youzu -Singapore- Pte Ltd,ou=Tenants,cn=Alice,o=Boustead,dc=getronettes,dc=com',
          tenant_name: 'Youzu -Singapore- Pte Ltd',
          type: 'VISITOR_TYPE_VISITOR'
        }
      ]
    })
  })

  const qr_response: QRResponse = await qr_request.json()
  return qr_response.data[0].qr_image.split('\n').slice(1)
}
