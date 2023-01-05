export type QRResponse = {
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
