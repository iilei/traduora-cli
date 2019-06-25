import getLocales from './getLocales'
import getExport from './getExport'
import config from './config'

const { 'pull-format': format } = config

const getExports = async () => {
  const locales = await getLocales()
  const localeExports = Object.keys(locales).map(locale => getExport(locale, format))

  return Promise.all(localeExports).then(result =>
    result.reduce((acc, current) => ({ ...acc, ...current }), {}),
  )
}

export default getExports
