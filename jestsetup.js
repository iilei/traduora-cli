const TR_BASE_URL = 'https://traduora.example.com/some-path/'
const TR_PROJECT_ID = 'xyz'

process.env = {
  ...process.env,
  TR_BASE_URL,
  TR_PROJECT_ID,
}
