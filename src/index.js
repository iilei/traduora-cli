import getConf from './getConf'

const run = () => {
  console.log(`Config:
${JSON.stringify(getConf(), null, 2)}
`)
}

export default run
