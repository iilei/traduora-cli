import runner from './runner'

jest.mock('./runner')

const origArgv = [...process.argv]

describe('index', () => {
  describe('with --task push', () => {
    beforeAll(() => {
      global.process.argv.push('--task')
      global.process.argv.push('push')
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
      expect(runner.mock.calls[0][0]).toEqual('push')
    })
  })
})
