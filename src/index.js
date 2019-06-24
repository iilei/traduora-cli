import runner from './runner'

const [task] = process.argv.slice(2)

runner(task || 'pull')
