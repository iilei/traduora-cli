import getExports from '../../modules/getExports'
import config from '../../modules/config'
import { localePlaceholder } from '../../modules/getConf'

const pull = async () => {
  const { 'pull-to': pullTo } = config
  const exports = await getExports().then(allExports => {
    Object.entries(allExports).forEach(([key]) => {
      const destination = `${pullTo.replace(localePlaceholder, key)}`
      console.log(destination)
    })
  })

  console.log(JSON.stringify(exports, null, 2))
}

export default pull
