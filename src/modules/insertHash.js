import crypto from 'crypto'

import { hashToken } from './getConf' // =>  RegEx /<hash:(\d+)>/

/**
 * @param {String} template E.g "<locale>.<hash:6>.json" -- where "6" is the maximum length of the resulting hash
 * @param {String} contents String to be hashed
 * @returns {string|*|void} Interpolated Template, e.g. "<locale>.bada55.json"
 */
const insertHash = (template = '', contents = '') => {
  return template.replace(hashToken, (match, chars) =>
    crypto
      .createHash('md5')
      .update(contents)
      .digest('hex')
      .substring(0, chars),
  )
}

export default insertHash
