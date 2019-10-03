import path from 'path'
import cosmiconfig from 'cosmiconfig'

const envPrefixProp = 'env-prefix'
const rootDirProp = 'root-dir'
const rootDirPlaceholder = '<rootDir>'
const localePlaceholder = '<locale>'
const indentSize = 2
const writeOpts = { encoding: 'utf8', flag: 'w' }
const hashToken = /<hash:(\d+)>/

const defaultConfig = {
  'base-path': '/api/v1',
  'max-retry': 5,
  'client-id': '',
  'client-secret': '',
  'project-id': '',
  'base-url': '',
  'pull-to': `${rootDirPlaceholder}/intl/pull/${localePlaceholder}.<hash:6>.json`,
  'push-from': [`${rootDirPlaceholder}/intl/push/${localePlaceholder}.json`],
  'pull-format': 'jsonflat',
  'version-check': ['0.13.0'],
}

const mayBeEnv = [
  'client-id',
  'client-secret',
  'project-id',
  'base-url',
  'root-dir',
  'max-retry',
  'base-path',
]

const toEnvVar = key => key.toUpperCase().replace('-', '_')
const toPrefixedEnvVar = (envPrefix, value) =>
  [envPrefix, toEnvVar(value)].filter(Boolean).join('_')
const findProperty = (envVar, envPrefix, config) =>
  Object.keys(config).find(value => toPrefixedEnvVar(envPrefix, value) === envVar)
const expandRootDir = (str, rootDir) => path.normalize(str.replace(rootDirPlaceholder, rootDir))
const conditionalExpandRoot = (val, rootDir) =>
  typeof val === 'string' && val.includes(rootDirPlaceholder) ? expandRootDir(val, rootDir) : val
const expandRootDirs = rootDir => (acc, [key, val]) => ({
  ...acc,
  [key]: conditionalExpandRoot(val, rootDir),
})

const validatePushFrom = array => {
  // needs at least one file
  if (!array.length || typeof array === 'string') {
    console.warn(`config 'push-from' not set properly`)
  }
}

const validateGlobMatches = (paths, globPaths) => {
  // needs at least one file
  if (!paths.length) {
    console.warn(`Globby yields no matches for${globPaths.map(p => `\n  - ${p}`)}`)
  }
}

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

  if (!explorerSearchResult) {
    throw new Error('No .traduorarc file or entry found')
  }

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

  if (!Array.isArray(config['push-from'])) {
    config['push-from'] = [config['push-from']]
  }

  config = Object.entries(config).reduce(expandRootDirs(config[rootDirProp]), {})

  config['max-retry'] = Math.max(1, parseInt(config['max-retry'], 10) || 0)

  return config
}

export default getConf

export {
  writeOpts,
  indentSize,
  localePlaceholder,
  expandRootDir,
  validatePushFrom,
  validateGlobMatches,
  hashToken,
}
