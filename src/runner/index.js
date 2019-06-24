import getConf from '../getConf'

const tasks = ['pull', 'push']

const runner = task => {
  if (!task || !tasks.includes(task)) {
    throw new Error(`Invalid task argument "${task}". Should be one of "${tasks.join('", "')}"`)
  }

  console.log(`Config:
${JSON.stringify({ ...getConf(), task }, null, 2)}
`)
}

export default runner
