import runner from './runner'

jest.mock('./runner')

const origArgv = [...process.argv]

describe('index', () => {
  describe('with --task pull', () => {
    beforeAll(() => {
      global.process.argv.push('--task')
      global.process.argv.push('pull')
    })

    beforeEach(() => {
      runner.mockClear()
    })

    afterAll(() => {
      global.process.argv = origArgv
    })

    afterEach(jest.resetAllMocks)

    it('should execute the runner with corresponding arg', () => {
      require('./index')
      expect(runner.mock.calls[0][0]).toEqual('pull')
    })
  })
})
