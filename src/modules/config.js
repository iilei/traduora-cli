import getConf from './getConf'

let memoizedConfig

const config = (() => {
  if (!memoizedConfig) {
    memoizedConfig = getConf()
  }
  return memoizedConfig
})()

export default config
