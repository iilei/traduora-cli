import globby from 'globby'

import getTerms from '../../modules/getTerms'
import config from '../../modules/config'
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

  // next: collect terms and their initial values in authoring locale

  // filter for !exclude.includes()

  // promise CreateAndInit - creates term,  then patches /translations/<locale> { termId: response.data.data.id , value }
  console.log(exclude)
}

export default push
