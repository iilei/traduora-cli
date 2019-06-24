import runner from './runner'

jest.mock('./runner')

describe('index', () => {
  it('should execute the runner', () => {
    require('./index') /* eslint-disable-line */
    expect(runner.mock.calls.length).toEqual(1)
  })
})
