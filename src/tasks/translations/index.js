import fs from 'fs'
import { promisify } from 'util'
import stringify from 'json-stable-stringify'
import insertHash from '../../modules/insertHash'
import getLocales from '../../modules/getLocales'
import { indentSize, writeOpts } from '../../modules/getConf'

const writeFile = promisify(fs.writeFile)

const translations = async (config, output) =>
  getLocales().then(result => {
    const sorted = stringify(result, { space: indentSize })
    if (output) {
      writeFile(insertHash(output, sorted), sorted, writeOpts)
    } else {
      console.info(`No "--output" given to write locales:\n${sorted}\n`)
    }
  })

export default translations
