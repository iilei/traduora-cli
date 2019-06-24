import getConf from '../getConf'
import getAccessToken from '../modules/getAccessToken'

const runner = async task => {
  const conf = getConf()
  // auth: client credentials
  // curl --request POST \
  //   --url <TR_API_BASE>/åauth/token \
  //   --header 'content-type: application/json' \
  //   --data '{
  //       "grantType": "client_credentials",
  //       "clientId": "<abc>",
  //       "clientSecret": "<xyz>"
  // }'

  // => {
  //   "data": {
  //     "accessToken": "ey.."
  //   }
  // }

  // ? exit code 401

  // pull: just pull

  // ? exit code 404

  // push:
  //    pull with a tempFolder as root directory
  //    diff term keys
  //      - new keys: POST
  //      - [not mvp] existing keys: PATCH

  const accessToken = await getAccessToken(conf)

  console.log(`Config:
${JSON.stringify({ ...getConf(), task, accessToken }, null, 2)}
`)
}

export default runner
