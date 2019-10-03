import config from '../modules/config'
import getAuthToken from '../modules/getAuthToken'
import getHealth from '../modules/getHealth'
import cleanPath from '../modules/cleanPath'
import { setAuthToken, setBaseUrl, appendBasePath } from '../modules/axiosInstance'
import tasks from '../tasks'

const runner = async (task, output) => {
  const health = await getHealth()

  if (!health || !config['version-check'].includes(health.version)) {
    console.warn('Caution: Versions may be incompatible!')
  }

  setBaseUrl(cleanPath(config['base-url'], config['base-path']))

  // configure axios to send Authorization Bearer for all subsequent requests
  setAuthToken(await getAuthToken())
  // configure axios baseUrl for all subsequent requests

  appendBasePath(`/projects/${config['project-id']}/`)

  // execute task
  await tasks[task](config, output)
}

export default runner
