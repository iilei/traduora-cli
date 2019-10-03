const TR_BASE_URL = 'https://traduora.example.com/'
const TR_BASE_PATH = '/some-path/'
const TR_PROJECT_ID = 'xyz'
const TR_CLIENT_ID = 'test'
const TR_CLIENT_SECRET = 'test'

process.env = {
  ...process.env,
  TR_BASE_URL,
  TR_PROJECT_ID,
  TR_BASE_PATH,
  TR_CLIENT_ID,
  TR_CLIENT_SECRET,
}
