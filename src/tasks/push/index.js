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

  if (Object.keys(contents).length) {
    console.info(`Created terms in ${locale}:\n${JSON.stringify(contents, null, 2)}`)
  } else {
    console.info('No translation terms to create')
  }

  const initializations = Object.entries(contents).map(([key, value]) => initializeTerm(key, value))

  await Promise.all(initializations)
}

export default push
