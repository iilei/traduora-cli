import crypto from 'crypto'

import { hashToken } from './getConf'
/**
 *
 * @param {String} template
 * @param {String} string
 * @returns {String}
 */
const insertHash = (template, contents) => {
  return template.replace(hashToken, (match, chars) =>
    crypto
      .createHash('md5')
      .update(contents)
      .digest('hex')
      .substring(0, chars),
  )
}

export default insertHash
