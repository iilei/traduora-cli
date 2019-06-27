const origArgv = [...process.argv]

describe('index', () => {
  jest.doMock('./runner', jest.fn(() => jest.fn()))

  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    global.process.argv = origArgv
  })

  describe('no task given implies pull', () => {
    it('should execute the runner with corresponding arg', () => {
      const runner = require('./runner')
      require('./index')
      expect(runner.mock.calls[0][0]).toEqual('pull')
    })
  })

  describe('with --task pull', () => {
    beforeEach(() => {
      global.process.argv.push('--task')
      global.process.argv.push('pull')
    })

    afterEach(() => {
      global.process.argv.pop()
      global.process.argv.pop()
    })

    it('should execute the runner with corresponding arg', () => {
      const runner = require('./runner')
      require('./index')
      expect(runner.mock.calls[0][0]).toEqual('pull')
    })
  })

  describe('with --task push', () => {
    beforeEach(() => {
      global.process.argv.push('--task')
      global.process.argv.push('push')
    })

    afterEach(() => {
      global.process.argv.pop()
      global.process.argv.pop()
    })

    it('should execute the runner with corresponding arg', () => {
      const runner = require('./runner')
      require('./index')
      expect(runner.mock.calls[0][0]).toEqual('push')
    })
  })

  describe('with --task translations -o /foo/bar', () => {
    beforeEach(() => {
      global.process.argv.push('--task')
      global.process.argv.push('translations')
      global.process.argv.push('-o')
      global.process.argv.push('/foo/bar')
    })

    afterEach(() => {
      global.process.argv.pop()
      global.process.argv.pop()
      global.process.argv.pop()
      global.process.argv.pop()
    })

    it('should execute the runner with corresponding arg', () => {
      const runner = require('./runner')
      require('./index')
      expect(runner.mock.calls[0][0]).toEqual('translations')
      expect(runner.mock.calls[0][1]).toEqual('/foo/bar')
    })
  })

  describe('with short notation', () => {
    beforeEach(() => {
      global.process.argv.push('-t')
      global.process.argv.push('translations')
    })

    afterEach(() => {
      global.process.argv.pop()
      global.process.argv.pop()
    })

    it('should execute the runner with corresponding arg', () => {
      const runner = require('./runner')
      require('./index')
      expect(runner.mock.calls[0][0]).toEqual('translations')
    })
  })
})
