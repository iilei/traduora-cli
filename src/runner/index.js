import getConf from '../getConf'

const runner = () => {
  console.log(`Config:
${JSON.stringify(getConf(), null, 2)}
`)
}

export default runner
