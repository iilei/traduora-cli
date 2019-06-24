import cosmiconfig from 'cosmiconfig'

const envPrefixProp = 'env-prefix'

const defaultConfig = {
  'client-id': '',
  'client-key': '',
  'project-id': '',
  'api-base': '',
}

const toEnvVar = key => key.toUpperCase().replace('-', '_')
const toPrefixedEnvVar = (envPrefix, value) =>
  [envPrefix, toEnvVar(value)].filter(Boolean).join('_')
const findProperty = (envVar, envPrefix, config) =>
  Object.keys(config).find(value => toPrefixedEnvVar(envPrefix, value) === envVar)

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

  const config = {
    [envPrefixProp]: 'TR',
    ...defaultConfig,
    ...explorer.searchSync().config,
  }

  const envPrefix = config[envPrefixProp].trim()

  const doNotUseEnv = [envPrefixProp, 'locales', 'locale']

  const envKeys = Object.keys(config)
    .map(value => (doNotUseEnv.includes(value) ? '' : toPrefixedEnvVar(envPrefix, value)))
    .filter(Boolean)

  envKeys.forEach(key => {
    if (typeof process.env[key] !== 'undefined') {
      config[findProperty(key, envPrefix, config)] = process.env[key]
    }
  })

  return config
}

export default getConf
