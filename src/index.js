import yargs from 'yargs'
import runner from './runner'

const {
  argv: { task },
} = yargs.option('task', {
  alias: 't',
  describe: 'task to run',
  choices: ['pull', 'push'],
  default: 'pull',
})

runner(task)
