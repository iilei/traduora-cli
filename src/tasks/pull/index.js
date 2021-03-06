import fs from 'fs'
import { promisify } from 'util'
import { basename, dirname, join } from 'path'
import { uniq as _uniq } from 'lodash'

import stringify from 'json-stable-stringify'
import insertHash from '../../modules/insertHash'

import getExports from '../../modules/getExports'
import config from '../../modules/config'
import { localePlaceholder, indentSize, writeOpts, hashToken } from '../../modules/getConf'

const writeFile = promisify(fs.writeFile)

const writePromises = exports =>
  exports.map(async ({ terms, destination }) => {
    writeFile(destination, stringify(terms, { space: indentSize }), writeOpts)
    return destination
  })

const writeSummary = (localeMap, destinations) => {
  _uniq(destinations.map(dest => dirname(dest))).map(destination =>
    writeFile(
      join(destination, 'map.json'),
      stringify(localeMap, { space: indentSize }),
      writeOpts,
    ),
  )
}

const pull = async () => {
  const { 'pull-to': pullTo } = config
  const localeMap = {}

  const exports = await getExports().then(allExports => {
    return Object.entries(allExports).map(([key, terms]) => {
      // In order to have reliable content hashes, sorting needs to be applied
      const sorted = stringify(terms, { space: indentSize })
      // replace <locale> with the respective locale name
      const filePathTemplate = `${pullTo.replace(localePlaceholder, key)}`
      const destination = insertHash(filePathTemplate, sorted)
      localeMap[key] = basename(destination)

      return {
        terms,
        destination,
      }
    })
  })

  await Promise.all(writePromises(exports)).then(destinations => {
    if (pullTo.match(hashToken)) {
      writeSummary(localeMap, destinations)
    }
  })
}

export default pull
