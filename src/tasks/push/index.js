import globby from 'globby'
import { omit as _omit } from 'lodash'

import config from '../../modules/config'

import getTerms from '../../modules/getTerms'
import getContents from '../../modules/getContents'
import initializeTerm from '../../modules/initializeTerm'

import {
  expandRootDir,
  validatePushFrom,
  validateGlobMatches,
  localePlaceholder,
} from '../../modules/getConf'

const { locale, 'push-from': pushFrom, 'root-dir': rootDir } = config

const aggregateReport = (reports, negate = 0) =>
  reports.reduce((acc, cur) => {
    if (Boolean(cur.error) !== Boolean(negate)) {
      return acc
    }
    return { ...acc, [cur.key]: cur.value }
  }, {})

const push = async () => {
  validatePushFrom(pushFrom)

  const reports = []
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
  await initializations.reduce((acc, cur) => {
    return acc.then(async () => {
      return reports.push(await cur().then(result => result))
    })
  }, Promise.resolve())

  const succeeded = aggregateReport(reports)

  const failed = aggregateReport(reports, 1)

  if (reports.length) {
    if (Object.keys(succeeded).length) {
      console.info(`succeeded: ${JSON.stringify(succeeded, null, 2)}`)
    }
    if (Object.keys(failed).length) {
      console.info(`failed: ${JSON.stringify(failed, null, 2)}`)
    }
  } else {
    console.info('No translation terms to create')
  }

  return reports
}

export default push
