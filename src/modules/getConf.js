import path from 'path'
import cosmiconfig from 'cosmiconfig'

const envPrefixProp = 'env-prefix'
const rootDirProp = 'root-dir'
const rootDirPlaceholder = '<rootDir>'

const defaultConfig = {
  'client-id': '',
  'client-secret': '',
  'project-id': '',
  'base-url': '',
  'pull-to': `${rootDirPlaceholder}/intl/pull/<locale>.json`,
  'push-from': `${rootDirPlaceholder}/intl/push/<locale>.json`,
  'pull-format': 'jsonflat',
  'push-format': 'json',
}

const mayBeEnv = ['client-id', 'client-secret', 'project-id', 'base-url', 'root-dir']

const toEnvVar = key => key.toUpperCase().replace('-', '_')
const toPrefixedEnvVar = (envPrefix, value) =>
  [envPrefix, toEnvVar(value)].filter(Boolean).join('_')
const findProperty = (envVar, envPrefix, config) =>
  Object.keys(config).find(value => toPrefixedEnvVar(envPrefix, value) === envVar)
const expandRootDir = (str, rootDir) => path.normalize(str.replace(rootDirPlaceholder, rootDir))
const conditionalExpandRoot = (val, rootDir) =>
  val.includes(rootDirPlaceholder) && typeof val === 'string' ? expandRootDir(val, rootDir) : val
const expandRootDirs = rootDir => (acc, [key, val]) => ({
  ...acc,
  [key]: conditionalExpandRoot(val, rootDir),
})

const getConf = () => {
  const explorer = cosmiconfig('traduora', {
    searchPlaces: [
      'package.json',
      '.traduorarc',
      '.traduorarc.json',
      '.traduorarc.yaml',
      '.traduorarc.yml',
      '.traduorarc.js',
      'traduora.config.js',
    ],
  })
  const explorerSearchResult = explorer.searchSync()
  const {
    filepath,
    config: { 'root-dir': rootDir },
  } = explorerSearchResult

  let config = {
    [envPrefixProp]: 'TR',
    ...defaultConfig,
    ...explorerSearchResult.config,
    [rootDirProp]: rootDir || path.dirname(filepath),
  }

  const envPrefix = config[envPrefixProp].trim()

  const envKeys = Object.keys(config)
    .map(value => (mayBeEnv.includes(value) ? toPrefixedEnvVar(envPrefix, value) : ''))
    .filter(Boolean)

  envKeys.forEach(key => {
    if (typeof process.env[key] !== 'undefined') {
      config[findProperty(key, envPrefix, config)] = process.env[key]
    }
  })

  config = Object.entries(config).reduce(expandRootDirs(config[rootDirProp]), {})

  return config
}

export default getConf
