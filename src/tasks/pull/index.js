import fs from 'fs'
import { promisify } from 'util'
import stringify from 'json-stable-stringify'
import insertHash from '../../modules/insertHash'

import getExports from '../../modules/getExports'
import config from '../../modules/config'
import { localePlaceholder } from '../../modules/getConf'

const writeFile = promisify(fs.writeFile)

const pull = async () => {
  const { 'pull-to': pullTo } = config
  const exports = await getExports().then(allExports => {
    return Object.entries(allExports).map(([key, terms]) => {
      // In order to have reliable content hashes, sorting needs to be applied
      const sorted = stringify(terms, { space: '  ' })
      // replace <locale> with the respective locale name
      const filePathTemplate = `${pullTo.replace(localePlaceholder, key)}`

      return {
        terms,
        destination: insertHash(filePathTemplate, sorted),
      }
    })
  })

  const writePromises = exports.map(async ({ terms, destination }) => {
    writeFile(destination, JSON.stringify(terms, null, 2), { encoding: 'utf8', flag: 'w' })
  })

  await Promise.all(writePromises)
}

export default pull
