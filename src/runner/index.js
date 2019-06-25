import config from '../modules/config'
import getAuthToken from '../modules/getAuthToken'
import { setAuthToken, setBaseUrl } from '../modules/axios'
import tasks from '../tasks'

const runner = async task => {
  // configure axios to send Authorization Bearer for all subsequent requests
  setAuthToken(await getAuthToken(config))
  // configure axios baseUrl for all subsequent requests
  setBaseUrl(`${config['base-url'].replace(/\/$/, '')}/projects/${config['project-id']}/`)

  await tasks[task](config)
}

export default runner
