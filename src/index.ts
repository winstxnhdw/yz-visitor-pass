import { writeFile } from 'fs/promises'
import { generate_access_token } from '@/generate_access_token'
import { generate_quick_response_code } from '@/generate_quick_response_code'

async function main() {
  const access_token = await generate_access_token()
  const quick_response_code = await generate_quick_response_code(access_token)
  const readme = `# yz-visitor-pass\n\n<div align="center">${quick_response_code}</div>`
  await writeFile('README.md', readme).catch(console.error)
}

main()
