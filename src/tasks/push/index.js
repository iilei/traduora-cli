import globby from 'globby'
import { omit as _omit } from 'lodash'
import stringify from 'json-stable-stringify'

import getTerms from '../../modules/getTerms'
import getContents from '../../modules/getContents'
import sequentially from '../../modules/sequentially'
import initializeTerm from '../../modules/initializeTerm'

import {
  expandRootDir,
  validatePushFrom,
  validateGlobMatches,
  localePlaceholder,
  indentSize,
} from '../../modules/getConf'
import config from '../../modules/config'

const { locale, 'push-from': pushFrom, 'root-dir': rootDir } = config

const aggregateReport = reports =>
  reports.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.error ? 'failed' : 'succeeded']: {
        ...acc[cur.error ? 'failed' : 'succeeded'],
        [cur.key]: cur.error ? parseInt(cur.error.code, 10) || cur.error.message : cur.value,
      },
    }),
    { succeeded: {}, failed: {} },
  )

const push = async () => {
  validatePushFrom(pushFrom)

  const exclude = Object.keys(await getTerms())

  const globPaths = pushFrom.map(template =>
    expandRootDir(template.replace(localePlaceholder, locale), rootDir),
  )

  const paths = await globby(globPaths)
  validateGlobMatches(paths, globPaths)

  // Collect terms and their initial values in authoring locale
  const contents = _omit(await getContents(paths), exclude)

  const initializations = Object.entries(contents).map(([key, value]) => initializeTerm(key, value))

  // execute sequentially, otherwise API calls end up with 500 errors too often
  const reports = await sequentially(initializations)

  const { succeeded, failed } = aggregateReport(reports)

  if (reports.length) {
    if (Object.keys(succeeded).length) {
      console.info(`succeeded: ${stringify(succeeded, { space: indentSize })}`)
    }
    if (Object.keys(failed).length) {
      console.info(`failed: ${stringify(failed, { space: indentSize })}`)
    }
  } else {
    console.info('No translation terms to create')
  }

  return reports
}

export default push
