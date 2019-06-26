import yargs from 'yargs'
import runner from './runner'

const {
  argv: { task, output },
} = yargs
  .option('task', {
    alias: 't',
    describe: 'task to run',
    choices: ['pull', 'push', 'translations'],
    default: 'pull',
  })
  .option('output', {
    alias: 'o',
    describe: 'output file for GET operations',
  })

runner(task, output)
